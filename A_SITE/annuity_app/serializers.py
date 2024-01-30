
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.forms import ValidationError

from rest_framework import serializers

from django.contrib.auth.models import User

from annuity_app.models import Junk, Junk_Detail

userModel = get_user_model()


class JunkDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Junk_Detail
        fields = fields = ['id', 'text']

    def create(self, validated_data):
        return super().create(validated_data)


class JunkSerializer(serializers.ModelSerializer):
    posts = JunkDetailSerializer(many=True, read_only=False)

    class Meta:
        model = Junk
        fields = ['id',
                  'user_name',
                  'password',
                  'color',
                  'age',
                  'name',
                  'posts']

    def create(self, validated_data):

        post_data = validated_data.pop('posts')
        junk = super().create(validated_data)
        for post in post_data:
            Junk_Detail.objects.create(junk=junk, **post)
        return junk

    def update(self, instance, validated_data):
        post_data = validated_data.pop('posts')
        for k in validated_data:
            setattr(instance, k, validated_data[k])
        instance.save()
        (instance.posts).all().delete()
        for post in post_data:
            Junk_Detail.objects.create(junk=instance, **post)

        return instance


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
        ]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        try:
            user = User.objects.create_user(
                username=validated_data['username'],
                password=validated_data['password']
            )
        except:
            raise serializers.ValidationError(
                {"Create": "Create failed."})

        return user


class LoginSerializer(serializers.Serializer):
    """
    This serializer defines two fields for authentication:
      * username
      * password.
    It will try to authenticate the user with when validated.
    """
    username = serializers.CharField(
        label="Username",
        write_only=True
    )
    password = serializers.CharField(
        label="Password",
        # This will be used when the DRF browsable API is enabled
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )

    def validate(self, attrs):
        # Take username and password from request
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            # Try to authenticate the user using Django auth framework.
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)
            if not user:
                # If we don't have a regular user, raise a ValidationError
                msg = 'Access denied: wrong username or password.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Both "username" and "password" are required.'
            raise serializers.ValidationError(msg, code='authorization')
        # We have a valid user, put it in the serializer's validated_data.
        # It will be used in the view.
        attrs['user'] = user
        return attrs
