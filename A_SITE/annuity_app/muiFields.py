from django.db import models



mui_column_types = ('string', 'number', 'date',
                    'dateTime', 'boolean', 'singleSelect')


def getMuiColDef(model):

    field_list = model._meta.fields
    return_data = {}
    no_order = 100
    col_order_fudge = 0
    for field in field_list:
        field_name: str = field.name
        field_meta = field.__dict__
        return_meta = {}
        col_order = 0
        if 'mui_order' in field_meta:
            col_order = field_meta['mui_order']
        else:
            no_order += 1
            col_order = no_order
        # col_order_fudge takes care of de-dupping two fields with same field_meta['mui_order']
        col_order_fudge += .0001
        return_meta['field'] = field_name
        if 'mui_type' in field_meta and field_meta['mui_type'] in mui_column_types:
            return_meta['type'] = field_meta['mui_type']
        else:
            return_meta['type'] = fieldTypeMuiDict[type(field).__name__]
        if 'mui_width' in field_meta:
            return_meta['width'] = field_meta['mui_width']
        else:
            return_meta['width'] = 100
        return_meta['description'] = field_meta['help_text']

        verbose_name: str = field_meta['verbose_name']
        return_meta['headerName'] = verbose_name.title()
        if 'mui_headerName' in field_meta and field_meta['mui_headerName'] != '':
            return_meta['headerName'] = field_meta['mui_headerName']

        if return_meta['field'] == 'id':
            col_order = -1

        return_data[col_order+col_order_fudge] = return_meta

        d = dict(sorted(return_data.items()))

        gridColDef = []

        for value in d.values():
            gridColDef.append(value)

    return gridColDef


fieldTypeMuiDict = {
    'AutoField': 'number',
    'BigAutoField': 'number',
    'BigIntegerField': 'number',
    'BinaryField': 'number',
    'BooleanField': 'boolean',
    'CharField': 'string',
    'CommaSeparatedIntegerField': 'string',
    'DateField': 'date',
    'DateTimeField': 'datetime',
    'DecimalField': 'number',
    'DurationField': 'string',
    'EmailField': 'string',
    'FilePathField': 'string',
    'FloatField': 'number',
    'GenericIPAddressField': 'string',
    'IPAddressField': 'string',
    'IntegerField': 'number',
    'NullBooleanField': 'boolean',
    'PositiveBigIntegerField': 'number',
    'PositiveIntegerField': 'number',
    'PositiveSmallIntegerField': 'number',
    'SlugField': 'string',
    'SmallAutoField': 'number',
    'SmallIntegerField': 'number',
    'TextField': 'string',
    'TimeField': 'dateTime',
    'URLField': 'string',
    'UUIDField': 'string',

    'MuiAutoField': 'number',
    'MuiBigAutoField': 'number',
    'MuiBigIntegerField': 'number',
    'MuiBinaryField': 'number',
    'MuiBooleanField': 'boolean',
    'MuiCharField': 'string',
    'MuiCommaSeparatedIntegerField': 'string',
    'MuiDateField': 'date',
    'MuiDateTimeField': 'datetime',
    'MuiDecimalField': 'number',
    'MuiDurationField': 'string',
    'MuiEmailField': 'string',
    'MuiFilePathField': 'string',
    'MuiFloatField': 'number',
    'MuiGenericIPAddressField': 'string',
    'MuiIPAddressField': 'string',
    'MuiIntegerField': 'number',
    'MuiNullBooleanField': 'boolean',
    'MuiPositiveBigIntegerField': 'number',
    'MuiPositiveIntegerField': 'number',
    'MuiPositiveSmallIntegerField': 'number',
    'MuiSlugField': 'string',
    'MuiSmallAutoField': 'number',
    'MuiSmallIntegerField': 'number',
    'MuiTextField': 'string',
    'MuiTimeField': 'dateTime',
    'MuiURLField': 'string',
    'MuiUUIDField': 'string',

}


def setMuiAttributes(self, mui_order: int, mui_type: str, mui_headerName: str, mui_width: int):
    self.field_class = type(self).__name__
    if mui_type == '':
        self.mui_type = fieldTypeMuiDict[type(
            self).__name__]
    else:
        self.mui_type = mui_type
    self.mui_order = mui_order
    self.mui_headerName = mui_headerName
    self.mui_width = mui_width


def addKwargs(self, name, path, args, kwargs):
    # Only include kwarg if it's not the default
    if self.mui_order != 50:
        kwargs["mui_order"] = self.mui_order
    if self.mui_type != "":
        kwargs["mui_type"] = self.mui_type
    if self.mui_headerName != "":
        kwargs["mui_headerName"] = self.mui_headerName
    if self.mui_width != 100:
        kwargs["mui_width"] = self.mui_width

    return name, path, args, kwargs


class MuiMixin:
    def __init__(self,  mui_order=50, mui_type='', mui_headerName='', mui_width=100, *args, **kwargs):
        setMuiAttributes(
            self, mui_order, mui_type, mui_headerName, mui_width)
        super().__init__(*args, **kwargs)

    def deconstruct(self):
        name, path, args, kwargs = super().deconstruct()
        return addKwargs(self, name, path, args, kwargs)


class MuiAutoField(MuiMixin, models.AutoField):
    pass


class MuiBigAutoField(MuiMixin, models.BigAutoField):
    pass


class MuiBigIntegerField(MuiMixin, models.BigIntegerField):
    pass


class MuiBinaryField(MuiMixin, models.BinaryField):
    pass


class MuiBooleanField(MuiMixin, models.BooleanField):
    pass


class MuiCharField(MuiMixin, models.CharField):
    pass


class MuiDateField(MuiMixin, models.DateField):
    pass


class MuiDateTimeField(MuiMixin, models.DateTimeField):
    pass


class MuiDecimalField(MuiMixin, models.DecimalField):
    pass


class MuiDurationField(MuiMixin, models.DurationField):
    pass


class MuiEmailField(MuiMixin, models.EmailField):
    pass


class MuiFilePathField(MuiMixin, models.FilePathField):
    pass


class MuiFloatField(MuiMixin, models.FloatField):
    pass


class MuiGenericIPAddressField(MuiMixin, models.GenericIPAddressField):
    pass


class MuiIPAddressField(MuiMixin, models.IPAddressField):
    pass


class MuiIntegerField(MuiMixin, models.IntegerField):
    pass


class MuiNullBooleanField(MuiMixin, models.NullBooleanField):
    pass


class MuiPositiveBigIntegerField(MuiMixin, models.PositiveBigIntegerField):
    pass


class MuiPositiveIntegerField(MuiMixin, models.PositiveIntegerField):
    pass


class MuiPositiveSmallIntegerField(MuiMixin, models.PositiveSmallIntegerField):
    pass


class MuiSlugField(MuiMixin, models.SlugField):
    pass


class MuiSmallAutoField(MuiMixin, models.SmallAutoField):
    pass


class MuiSmallIntegerField(MuiMixin, models.SmallIntegerField):
    pass


class MuiTextField(MuiMixin, models.TextField):
    pass


class MuiTimeField(MuiMixin, models.TimeField):
    pass


class MuiURLField(MuiMixin, models.URLField):
    pass


class MuiUUIDField(MuiMixin, models.UUIDField):
    pass
