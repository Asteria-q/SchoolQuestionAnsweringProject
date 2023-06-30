import string

from django.db import models
from django.contrib.auth.models import Group

class MyGroup(Group):
    pass

class BitwiseAnd(models.Func):
    function = 'BIT_AND'

# Create your models here.
#可选的display info : Sex   Grade   Profession  Tags
#可选的Tags：一个大列表（顺序固定、不能修改）——其实是分类

# 用户
class User(models.Model):
    UID = models.AutoField(primary_key= True)
    OpenID = models.CharField(max_length=60)
    UserName = models.CharField(max_length=50)
    Sex = models.CharField(max_length=2)
    # Image = models.ImageField()
    Image = models.CharField(max_length=400)
    Grade = models.CharField(max_length=4)
    Profession = models.CharField(max_length=50)
    SelfIntro = models.CharField(max_length=120) 

    Tags = models.BigIntegerField()   #可选的Tags：一个大列表（顺序固定、不能修改）——其实是分类
    DisplayInfo = models.IntegerField() #可选的display info : Sex   Grade   Profession  Tags
    
    def changeName(self, name):
        self.UserName = name

# 问题
class Question(models.Model):
    QID = models.AutoField(primary_key= True)
    QueTime= models.DateTimeField()
    Title=models.CharField(max_length=50) 
    QueContent=models.TextField()
    AnswersNum = models.IntegerField()
    ClickNum = models.IntegerField(default=0)
    LikeNum = models.IntegerField(default=0)
    Picture = models.CharField(max_length=400,null=True, blank=True)
    Tags = models.BigIntegerField()  

    UID = models.ForeignKey(User,on_delete=models.CASCADE) 

# 回答
class Answer(models.Model):
    AID = models.AutoField(primary_key= True)
    AnsContent=models.TextField()
    AnsTime= models.DateTimeField()
    LikeNum = models.IntegerField()
    QID = models.ForeignKey(Question,on_delete=models.CASCADE)
    UID = models.ForeignKey(User,on_delete=models.CASCADE)

# 类别
class Tag(models.Model):
    TID = models.AutoField(primary_key= True)
    TagContent=models.TextField()
    

# 过滤关键字
class KeyWord(models.Model):
    KID = models.AutoField(primary_key=True)
    KeyWorldContent = models.CharField(max_length=20)

# 举报单
class Reported(models.Model):
    RID = models.AutoField(primary_key= True)
    ID = models.IntegerField()
    Type = models.IntegerField() # 0是问题  1是回答
    RepTime = models.DateTimeField()
    UID = models.ForeignKey(User,on_delete=models.CASCADE)
    # UserName = models.CharField(max_length=50)
    Reason = models.TextField()
    isSolved = models.BooleanField()
    
    def solve(self):
        self.isSolved = True

# 用户点赞
class UserLike(models.Model):
    # 为了避免多对多关系自动生成中间表，手动定义中间表
    LikeUser = models.ForeignKey(User, on_delete=models.CASCADE)
    LikeQuestion = models.ForeignKey(Question, on_delete=models.CASCADE, null=True, blank=True)
    LikeAnswer = models.ForeignKey(Answer, on_delete=models.CASCADE, null=True, blank=True)
    LikeType = models.IntegerField() # 0是问题  1是回答

    class Meta:
        unique_together = (('LikeUser', 'LikeQuestion'), ('LikeUser', 'LikeAnswer'))

#### 6.7 修改 增加 储存AppSecret ##########
class Secret(models.Model):
    Name = models.AutoField(primary_key= True)  # SecretID
    Value = models.CharField(max_length=50) #AppSecret
    
################################