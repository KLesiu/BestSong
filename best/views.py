from django.shortcuts import render,redirect
from .models import Song

# Create your views here.
def index(request):
    songs = Song.objects.all()
    return render(request, 'index.html', {'songs':songs})

def game(request):
    songs = Song.objects.all()
    return render(request,'game.html', {'songs':songs})

def give_points(request):
    winner =request.POST['winner_game']
    second = request.POST['second_game']
    find_winner = Song.objects.get(title=winner)
    find_second = Song.objects.get(title=second)
    find_winner.points += 5
    find_winner.save()
    find_second.points += 2
    find_second.save()
    
    return redirect('/')
