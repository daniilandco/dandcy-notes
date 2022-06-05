from django.urls import path, include, re_path

from .views import AdminNoteListView, NoteCreateView, NoteRetrieveView, NoteUpdateView, NoteDeleteView, \
    UserNoteListView, CustomObtainAuthToken, Logout

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path(r'auth/login/', CustomObtainAuthToken.as_view()),
    path('auth/logout/', Logout.as_view()),

    path('admin/notes/all/', AdminNoteListView.as_view()),

    path('notes/all/', UserNoteListView.as_view()),
    path('notes/create/', NoteCreateView.as_view()),

    path('notes/<int:pk>/', NoteRetrieveView.as_view()),
    path('notes/<int:pk>/update/', NoteUpdateView.as_view()),
    path('notes/<int:pk>/delete/', NoteDeleteView.as_view()),
]
