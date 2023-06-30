from django.urls import path,register_converter
from django.urls import include
from myApp import views
from django.urls import converters
from . import converters as my_converters


# 注册自定义转换器
register_converter(my_converters.DateTimeConverter, 'datetime')



urlpatterns = [
    
    path('system/secret/', views.get_secret, name='get_secret'),
    path('hello_world/', views.hello_world),
    path('reported/', views.report_list, name='report_list'),
    # path('admin/reports/', views.report_list, name='report_list'),
    # path('report_list/', views.report_list, name='report_list'),
    path('solve_report/<int:report_rid>/', views.solve_report, name='solve_report'),

    path('user/profile/', views.get_user_all_info, name='get_user_all_info'),
    path('user/changeInfo/', views.edit_user_info, name='edit_user_info'),
    path('user/privacy/', views.edit_displayInfo, name='edit_displayInfo'),
    path('user/logoff/', views.delete_user, name='delete_user'),
    path('user/report/', views.new_report, name='new_report'),
    path('user/display/', views.visit_other, name='visit_other'),
    path('user/questions/', views.get_my_question, name='get_my_question'),
    path('user/answers/', views.get_my_answer, name='get_my_answer'),

    path('question/release/', views.new_question, name='new_question'),
    path('question/search/', views.search_question, name='search_question'),
    path('question/sort/', views.sort_question, name='sort_question'),
    path('question/show/', views.show_question, name='show_question'),
    path('question/hot/', views.get_hot_question, name='get_hot_question'),
    path('question/recommend/', views.recommend_question, name='recommend_question'),
    
    path('answer/release/', views.new_answer, name='new_answer'),
    path('answer/like/', views.answer_like, name='answer_like'),
    path('system/keyword/', views.get_Ketwords, name='get_Ketwords')

]

