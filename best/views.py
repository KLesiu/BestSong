from django.shortcuts import render
from .models import Song

# Create your views here.
def index(request):
    songs = Song.objects.all()
    return render(request, 'index.html', {'songs':songs})

def game(request):
    songs = Song.objects.all()
    return render(request,'game.html', {'songs':songs})