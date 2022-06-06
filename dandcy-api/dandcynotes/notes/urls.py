from django.urls import path, include, re_path
from djoser.views import UserViewSet

from .views import AdminNoteListView, NoteCreateView, NoteRetrieveView, NoteUpdateView, NoteDeleteView, \
    UserNoteListView, CustomObtainAuthToken, Logout

urlpatterns = [
    path('auth/users/', UserViewSet.as_view({'post': 'create'}), name='register'),
    path(r'auth/login/', CustomObtainAuthToken.as_view(), name='login'),
    path('auth/logout/', Logout.as_view()),

    path('admin/notes/all/', AdminNoteListView.as_view(), name='admin_notes'),

    path('notes/all/', UserNoteListView.as_view(), name='notes'),
    path('notes/create/', NoteCreateView.as_view(), name='create_note'),

    path('notes/<int:pk>/', NoteRetrieveView.as_view(), name='get_note'),
    path('notes/<int:pk>/update/', NoteUpdateView.as_view(), name='update_note'),
    path('notes/<int:pk>/delete/', NoteDeleteView.as_view(), name='delete_note'),
]
