import django
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

django.setup()


class AccountTests(APITestCase):
    user = None
    note = None

    def authenticate(self, is_admin=False):
        payload = {
            'username': 'user',
            'password': 'complex_passWord123'
        }

        self.client.post(reverse('register'), payload)

        if is_admin:
            payload['username'] = 'bondarkov'
            payload['password'] = 'root'

        response = self.client.post(reverse('login'), payload)

        self.user = response.data['user']['id']

        self.client.credentials(HTTP_AUTHORIZATION=f"Token {response.data['token']}")

    def test_get_notes_unauthorized(self):
        response = self.client.get(reverse('notes'), format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(len(response.data), 1)

    def test_get_notes_authorized(self):
        self.authenticate()

        response = self.client.get(reverse('notes'), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    # def test_get_notes_admin_authorized(self):
    #     self.authenticate(True)
    #
    #     response = self.client.get(reverse('admin_notes'), format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_note(self):
        self.authenticate()
        payload = {'content': 'test', 'title': 'stest1234kolas', 'user': self.user}

        response = self.client.post(reverse('create_note'), payload, format='json')

        self.note = response.data['id']

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'stest1234kolas')
        self.assertEqual(response.data['content'], 'test')

    def test_get_note(self):
        self.authenticate()

        self.test_create_note()

        response = self.client.get(reverse('get_note', args=(self.note,)), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'stest1234kolas')
        self.assertEqual(response.data['content'], 'test')

    def test_delete_note(self):
        self.authenticate()

        self.test_create_note()

        response = self.client.delete(reverse('delete_note', args=(self.note,)), format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, None)

    def test_update_note(self):
        self.authenticate()

        self.test_create_note()

        payload = {
            'title': 'new_title_test'
        }

        response = self.client.patch(reverse('update_note', args=(self.note,)), payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'new_title_test')
