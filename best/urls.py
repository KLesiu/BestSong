from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('game',views.game,name='game'),
    path('give_points',views.give_points,name='give_points')
]