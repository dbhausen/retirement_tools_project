import datetime

from django.db import models
from django.utils import timezone
from .muiFields import MuiCharField, MuiIntegerField

"""commit 2 change"""


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published")

    def __str__(self):
        return self.question_text

    def was_published_recently(self):
        return (
            self.pub_date >= timezone.now() - datetime.timedelta(days=1)
            and self.pub_date < timezone.now()
        )


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text


class Junk(models.Model):
    user_name = MuiCharField(
        max_length=100, mui_order=1, help_text='some helpful text', mui_width=200)
    password = MuiCharField(
        max_length=200)
    color = MuiCharField(max_length=200)
    age = MuiIntegerField(mui_order=1,
                          default=0,  help_text='age of a person as of last birth day')
    name = MuiCharField(max_length=200)


class Junk_Detail(models.Model):
    junk = models.ForeignKey(Junk,
                             on_delete=models.CASCADE, related_name='posts')
    text = models.CharField(max_length=200, default="")


modelDict = {
    'Junk': Junk,
    'Junk_Detail': Junk_Detail,
}
