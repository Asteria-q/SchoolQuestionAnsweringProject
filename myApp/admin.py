from django.contrib import admin
from myApp.models import User
from myApp.models import Question
from myApp.models import Answer
from myApp.models import Tag
from myApp.models import KeyWord
from myApp.models import Reported, UserLike
from django.http import JsonResponse
from django.urls import path
from .views import report_list
from django.shortcuts import render

admin.site.site_header = '校园问答系统管理后台'  # 设置header
admin.site.site_title = '校园问答系统管理后台'  # 设置title
admin.site.index_title = '校园问答系统管理后台'

# admin.site.register(User)
# admin.site.register(Question)
# admin.site.register(Answer)
# admin.site.register(Tag)
# admin.site.register(KeyWord)
# admin.site.register(Reported)
# admin.site.register(Task)

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = [
        'UID', 'OpenID', 'UserName', 'Sex', 'Image', 'Grade', 'Profession',
        'Tags', 'SelfIntro', 'DisplayInfo'
    ]
    # 自定义查询条件
    search_fields = ('UserName', )
    # 自定义筛选条件
    list_filter = ('Sex', 'Grade', 'Profession')


class QuestionAdmin(admin.ModelAdmin):
    list_display = [
        'QID', 'QueTime', 'Title', 'QueContent', 'AnswersNum', 'ClickNum',
        'LikeNum', 'Picture', 'Tags', 'UID'
    ]


class AnswerAdmin(admin.ModelAdmin):
    list_display = ['AID', 'AnsContent', 'AnsTime', 'LikeNum', 'QID', 'UID']


class TagAdmin(admin.ModelAdmin):
    list_display = ['TID', 'TagContent']


class KeyWordAdmin(admin.ModelAdmin):
    list_display = ['KID', 'KeyWorldContent']


class ReportedAdmin(admin.ModelAdmin):
    list_display = [
        'RID', 'ID', 'Type', 'RepTime', 'UID', 'Reason', 'isSolved'
    ]
    actions = ["success", "fail"]

    def success(self, request, queryset):
        for data in queryset:
            data.solve()
            # TODO 删除id对应的实体或者其它的操作
            report = Reported.objects.get(RID=data.RID)
            if (report.Type == 0):
                question = Question.objects.get(QID=report.ID)
                question.delete()
                # report.delete()
            else:
                answer = Answer.objects.get(AID=report.ID)
                answer.delete()
                # report.delete()
            data.save()
        return render(request, "success.html")
        # return JsonResponse(data={'status': 'success', 'msg': '处理成功！'})

    # <i class="fa-light fa-check fa-bounce" style="color: #19e141;"></i>
    success.icon = "fas fa-light fa-check"
    success.type = "success"
    success.short_description = "举报成功"
    success.confirm = "确定通过这些举报信息并且把对应的举报内容删除吗？"

    def fail(self, request, queryset):
        for data in queryset:
            data.solve()
            data.save()
        return render(request, "success.html")

    # <i class="fa-thin fa-xmark"></i>
    fail.icon = "fas fa-thin fa-xmark"
    fail.type = "danger"
    fail.short_description = "举报失败"
    fail.confirm = "确定"
    # def mark_as_solved(self, request, queryset):
    #     queryset.update(is_solved=True)

    # mark_as_solved.short_description = "处理"


class UserLikeAdmin(admin.ModelAdmin):
    list_display = ['LikeUser', 'LikeQuestion', 'LikeAnswer', 'LikeType']


admin.site.register(User, UserAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(KeyWord, KeyWordAdmin)
admin.site.register(Reported, ReportedAdmin)
admin.site.register(UserLike, UserLikeAdmin)

# urlpatterns = [
#     path('reports/', report_list, name='report_list'),
# ]