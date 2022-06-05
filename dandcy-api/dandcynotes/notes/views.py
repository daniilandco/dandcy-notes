import logging

from django.forms import model_to_dict
from rest_framework import generics, permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Note
from .serializers import NoteSerializer

logger = logging.getLogger('django')


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        logger.info('Getting token for logged-in user')
        return Response({'token': token.key, 'user': model_to_dict(token.user)})


class Logout(APIView):
    def post(self, request):
        request.user.auth_token.delete()
        logger.info('Deleting token from database for logging-out user')
        return Response(status=status.HTTP_200_OK)


class AdminNoteListView(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    logger.info('Getting notes of all users[admin-mode] view init')
    permission_classes = [permissions.IsAdminUser]


class UserNoteListView(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, **kwargs):
        current_user = request.user
        queryset = self.get_queryset().filter(user=current_user.pk)
        serializer = NoteSerializer(queryset, many=True)
        logger.info('Getting notes of logged-in user[user-mode]')
        return Response(serializer.data)


class NoteRetrieveView(generics.RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    logger.info('Retrieving a note information view init')
    permission_classes = [permissions.IsAuthenticated]


class NoteCreateView(generics.CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    logger.info('Creation of a note view init')
    permission_classes = [permissions.IsAuthenticated]


class NoteUpdateView(generics.UpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    logger.info('Note updating view init')
    permission_classes = [permissions.IsAuthenticated]


class NoteDeleteView(generics.DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    logger.info('Deletion of a note view init')
    permission_classes = [permissions.IsAuthenticated]
