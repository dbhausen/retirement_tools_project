"""
doc
"""
import json


class Life:
    """
    Describes a typical statistical life of a person
    """

    # EXACT_AGE = 0
    # MALE_DEATH_PROBABILITY = 1
    MALE_NUMBER_OF_LIVES = 2
    MALE_LIFE_EXPECTANCY = 3
    # FEMALE_DEATH_PROBABILITY = 4
    FEMALE_NUMBER_OF_LIVES = 5
    FEMALE_LIFE_EXPECTANCY = 6

    MALE = "Male"
    FEMALE = "Female"

    LIFE = [
        [0, 0.0063040, 100000, 75.97, 0.0052290, 100000, 80.96],
        [1, 0.0004260, 99370, 75.45, 0.0003420, 99477, 80.39],
        [2, 0.0002900, 99327, 74.48, 0.0002090, 99443, 79.42],
        [3, 0.0002290, 99298, 73.50, 0.0001620, 99422, 78.43],
        [4, 0.0001620, 99276, 72.52, 0.0001430, 99406, 77.45],
        [5, 0.0001460, 99260, 71.53, 0.0001250, 99392, 76.46],
        [6, 0.0001360, 99245, 70.54, 0.0001130, 99379, 75.47],
        [7, 0.0001270, 99232, 69.55, 0.0001040, 99368, 74.47],
        [8, 0.0001150, 99219, 68.56, 0.0000970, 99358, 73.48],
        [9, 0.0001030, 99208, 67.57, 0.0000930, 99348, 72.49],
        [10, 0.0000970, 99197, 66.57, 0.0000920, 99339, 71.50],
        [11, 0.0001090, 99188, 65.58, 0.0000980, 99330, 70.50],
        [12, 0.0001510, 99177, 64.59, 0.0001130, 99320, 69.51],
        [13, 0.0002320, 99162, 63.60, 0.0001380, 99309, 68.52],
        [14, 0.0003430, 99139, 62.61, 0.0001720, 99295, 67.53],
        [15, 0.0004650, 99105, 61.63, 0.0002110, 99278, 66.54],
        [16, 0.0005880, 99059, 60.66, 0.0002510, 99257, 65.55],
        [17, 0.0007200, 99001, 59.70, 0.0002930, 99232, 64.57],
        [18, 0.0008580, 98929, 58.74, 0.0003360, 99203, 63.59],
        [19, 0.0009990, 98845, 57.79, 0.0003790, 99170, 62.61],
        [20, 0.0011460, 98746, 56.85, 0.0004250, 99132, 61.63],
        [21, 0.0012880, 98633, 55.91, 0.0004720, 99090, 60.66],
        [22, 0.0014070, 98506, 54.98, 0.0005150, 99044, 59.69],
        [23, 0.0014940, 98367, 54.06, 0.0005510, 98993, 58.72],
        [24, 0.0015560, 98220, 53.14, 0.0005820, 98938, 57.75],
        [25, 0.0016100, 98067, 52.22, 0.0006120, 98880, 56.78],
        [26, 0.0016650, 97910, 51.31, 0.0006460, 98820, 55.82],
        [27, 0.0017170, 97746, 50.39, 0.0006840, 98756, 54.85],
        [28, 0.0017670, 97579, 49.48, 0.0007290, 98689, 53.89],
        [29, 0.0018170, 97406, 48.56, 0.0007790, 98617, 52.93],
        [30, 0.0018650, 97229, 47.65, 0.0008330, 98540, 51.97],
        [31, 0.0019110, 97048, 46.74, 0.0008870, 98458, 51.01],
        [32, 0.0019600, 96862, 45.83, 0.0009390, 98370, 50.06],
        [33, 0.0020140, 96672, 44.92, 0.0009880, 98278, 49.10],
        [34, 0.0020710, 96478, 44.01, 0.0010340, 98181, 48.15],
        [35, 0.0021380, 96278, 43.10, 0.0010850, 98079, 47.20],
        [36, 0.0022110, 96072, 42.19, 0.0011430, 97973, 46.25],
        [37, 0.0022790, 95860, 41.28, 0.0012050, 97861, 45.30],
        [38, 0.0023420, 95641, 40.37, 0.0012710, 97743, 44.36],
        [39, 0.0024050, 95417, 39.47, 0.0013450, 97619, 43.41],
        [40, 0.0024820, 95188, 38.56, 0.0014290, 97488, 42.47],
        [41, 0.0025830, 94951, 37.65, 0.0015240, 97348, 41.53],
        [42, 0.0027100, 94706, 36.75, 0.0016300, 97200, 40.59],
        [43, 0.0028700, 94450, 35.85, 0.0017480, 97042, 39.66],
        [44, 0.0030640, 94178, 34.95, 0.0018810, 96872, 38.73],
        [45, 0.0032850, 93890, 34.06, 0.0020290, 96690, 37.80],
        [46, 0.0035380, 93581, 33.17, 0.0021950, 96494, 36.88],
        [47, 0.0038340, 93250, 32.28, 0.0023860, 96282, 35.96],
        [48, 0.0041780, 92893, 31.41, 0.0026050, 96052, 35.04],
        [49, 0.0045690, 92505, 30.54, 0.0028510, 95802, 34.13],
        [50, 0.0049970, 92082, 29.67, 0.0031180, 95529, 33.23],
        [51, 0.0054620, 91622, 28.82, 0.0034030, 95231, 32.33],
        [52, 0.0059710, 91122, 27.98, 0.0037140, 94907, 31.44],
        [53, 0.0065260, 90577, 27.14, 0.0040520, 94554, 30.55],
        [54, 0.0071250, 89986, 26.32, 0.0044150, 94171, 29.68],
        [55, 0.0077660, 89345, 25.50, 0.0048130, 93755, 28.81],
        [56, 0.0084450, 88651, 24.70, 0.0052330, 93304, 27.94],
        [57, 0.0091560, 87903, 23.90, 0.0056470, 92816, 27.09],
        [58, 0.0098970, 87098, 23.12, 0.0060430, 92292, 26.24],
        [59, 0.0106710, 86236, 22.34, 0.0064410, 91734, 25.39],
        [60, 0.0115190, 85316, 21.58, 0.0068860, 91143, 24.56],
        [61, 0.0124190, 84333, 20.83, 0.0073910, 90515, 23.72],
        [62, 0.0133070, 83286, 20.08, 0.0079310, 89846, 22.90],
        [63, 0.0141640, 82177, 19.35, 0.0085080, 89134, 22.07],
        [64, 0.0150320, 81013, 18.62, 0.0091420, 88375, 21.26],
        [65, 0.0160130, 79795, 17.89, 0.0098740, 87568, 20.45],
        [66, 0.0171380, 78518, 17.18, 0.0107170, 86703, 19.65],
        [67, 0.0183620, 77172, 16.47, 0.0116600, 85774, 18.86],
        [68, 0.0196930, 75755, 15.77, 0.0127110, 84774, 18.07],
        [69, 0.0211740, 74263, 15.07, 0.0138940, 83696, 17.30],
        [70, 0.0228890, 72691, 14.39, 0.0152850, 82533, 16.54],
        [71, 0.0248690, 71027, 13.71, 0.0168780, 81272, 15.79],
        [72, 0.0270950, 69261, 13.05, 0.0186070, 79900, 15.05],
        [73, 0.0295870, 67384, 12.40, 0.0204660, 78413, 14.32],
        [74, 0.0323940, 65390, 11.76, 0.0225220, 76809, 13.61],
        [75, 0.0356680, 63272, 11.14, 0.0249290, 75079, 12.92],
        [76, 0.0393960, 61015, 10.53, 0.0277290, 73207, 12.23],
        [77, 0.0434530, 58611, 9.94, 0.0308550, 71177, 11.57],
        [78, 0.0478260, 56065, 9.37, 0.0343210, 68981, 10.92],
        [79, 0.0526490, 53383, 8.82, 0.0382110, 66613, 10.29],
        [80, 0.0582060, 50573, 8.28, 0.0427710, 64068, 9.68],
        [81, 0.0645810, 47629, 7.76, 0.0479920, 61328, 9.09],
        [82, 0.0716570, 44553, 7.26, 0.0536780, 58385, 8.52],
        [83, 0.0794650, 41361, 6.79, 0.0598100, 55251, 7.98],
        [84, 0.0881410, 38074, 6.33, 0.0665840, 51946, 7.45],
        [85, 0.0978540, 34718, 5.89, 0.0742580, 48487, 6.95],
        [86, 0.1087470, 31321, 5.48, 0.0830530, 44887, 6.47],
        [87, 0.1209190, 27915, 5.08, 0.0931230, 41159, 6.01],
        [88, 0.1344250, 24539, 4.71, 0.1045400, 37326, 5.57],
        [89, 0.1492730, 21241, 4.37, 0.1173050, 33424, 5.16],
        [90, 0.1654520, 18070, 4.05, 0.1313920, 29503, 4.78],
        [91, 0.1829350, 15080, 3.75, 0.1467530, 25627, 4.43],
        [92, 0.2016790, 12322, 3.48, 0.1633310, 21866, 4.11],
        [93, 0.2216370, 9837, 3.23, 0.1810640, 18294, 3.81],
        [94, 0.2427470, 7656, 3.01, 0.1998860, 14982, 3.55],
        [95, 0.2636720, 5798, 2.81, 0.2189080, 11987, 3.31],
        [96, 0.2840140, 4269, 2.64, 0.2378150, 9363, 3.09],
        [97, 0.3033550, 3057, 2.49, 0.2562650, 7136, 2.90],
        [98, 0.3212680, 2129, 2.36, 0.2738940, 5308, 2.73],
        [99, 0.3373320, 1445, 2.24, 0.2903280, 3854, 2.58],
        [100, 0.3541980, 958, 2.12, 0.3077470, 2735, 2.42],
        [101, 0.3719080, 619, 2.01, 0.3262120, 1893, 2.28],
        [102, 0.3905030, 388, 1.90, 0.3457850, 1276, 2.14],
        [103, 0.4100290, 237, 1.80, 0.3665320, 835, 2.01],
        [104, 0.4305300, 140, 1.70, 0.3885240, 529, 1.88],
        [105, 0.4520570, 80, 1.60, 0.4118350, 323, 1.76],
        [106, 0.4746590, 44, 1.51, 0.4365460, 190, 1.65],
        [107, 0.4983920, 23, 1.42, 0.4627380, 107, 1.54],
        [108, 0.5233120, 11, 1.34, 0.4905030, 58, 1.44],
        [109, 0.5494780, 5, 1.26, 0.5199330, 29, 1.34],
        [110, 0.5769510, 2, 1.18, 0.5511290, 14, 1.24],
        [111, 0.6057990, 1, 1.10, 0.5841960, 6, 1.15],
        [112, 0.6360890, 0, 1.03, 0.6192480, 3, 1.06],
        [113, 0.6678930, 0, 0.96, 0.6564030, 1, 0.98],
        [114, 0.7012880, 0, 0.90, 0.6957870, 0, 0.91],
        [115, 0.7363530, 0, 0.84, 0.7363530, 0, 0.84],
        [116, 0.7731700, 0, 0.78, 0.7731700, 0, 0.78],
        [117, 0.8118290, 0, 0.72, 0.8118290, 0, 0.72],
        [118, 0.8524200, 0, 0.66, 0.8524200, 0, 0.66],
        [119, 0.8950410, 0, 0.61, 0.8950410, 0, 0.61],
    ]

    @staticmethod
    def _validate_age(age: int):
        rtval = False
        if isinstance(age, int):
            rtval = 0 <= age <= 118
        if not rtval:
            raise ValueError("Age must be an int between 0 and 118")

    @staticmethod
    def _normalize_and_validate_sex(sex: str) -> str:
        # sex = str.title(sex)
        sex = sex.title()
        if sex not in (Life.MALE, Life.FEMALE):
            raise ValueError("Sex must be 'Male' or 'Female'")

        return sex


class Person(Life):
    """An individual for purposes of annuity calculations"""

    def __init__(self, name: int, sex: str, age: int):
        Life._validate_age(age)
        sex = Life._normalize_and_validate_sex(sex)
        self.name = name
        self.sex = sex
        self.age = age

    def __str__(self) -> str:
        return (
            "Instance of "
            + str(self.__class__)
            + "\n"
            + "    doc: "
            + self.__doc__
            + "\n"
            + "   dict: "
            + json.dumps(self.__dict__)
        )

    def validate_target_age(self, target_age: int):
        """Validates target is >= age. Raises ValueError"""
        rtval = False
        if isinstance(target_age, int):
            rtval = self.age <= target_age < 119
        if not rtval:
            raise ValueError(
                "Target age must be an int grater than or equal "
                + str(self.age)
                + " and less than 119"
            )

    def get_life_expectancy(self) -> float:
        """Returns the expected age to be reached bt person of this age and sex."""

        if self.sex == Life.MALE:
            return Life.LIFE[self.age][Life.MALE_LIFE_EXPECTANCY] + self.age

        return Life.LIFE[self.age][Life.FEMALE_LIFE_EXPECTANCY] + self.age

    def get_probability_of_death_by_age(self, target_age: int) -> float:
        """Return the probablity that this individual will die by target age."""

        self.validate_target_age(target_age)
        number_of_lives_column = Life.MALE_NUMBER_OF_LIVES

        if self.sex == Life.FEMALE:
            number_of_lives_column = Life.FEMALE_NUMBER_OF_LIVES

        start_lives = Life.LIFE[self.age][number_of_lives_column]
        end_lives = Life.LIFE[target_age + 1][number_of_lives_column]

        return (start_lives - end_lives) / start_lives

    def get_probability_of_living_to_age(self, target_age: int) -> float:
        """Return the probablity that this individual will live to age."""

        return 1 - self.get_probability_of_death_by_age(target_age)


class Couple(Life):
    """A married couple for purposes of annuity calculations"""

    def __init__(self, person1: Person, person2: Person):
        self.person1 = person1
        self.person2 = person2

    def __str__(self) -> str:
        return (
            "Instance of "
            + str(self.__class__)
            + "\n"
            + "    doc: "
            + self.__doc__
            + "\n"
            + "dict: person1: "
            + json.dumps(self.person1.__dict__)
            + "\n"
            + "      person2: "
            + json.dumps(self.person2.__dict__)
        )

    def get_probability_of_at_least_one_reaching_target_age(
        self, target_age: int
    ) -> float:
        """Returns the probablity that at least one of this couple will reach target age."""
        self.person1.validate_target_age(target_age)
        self.person2.validate_target_age(target_age)

        return 1 - (self.person1.get_probability_of_death_by_age(target_age)) * (
            self.person2.get_probability_of_death_by_age(target_age)
        )

    def get_probability_of_neither_reaching_target_age(self, target_age: int) -> float:
        """Returns the probablity that neither one of this couple will reach target age."""
        self.person1.validate_target_age(target_age)
        self.person2.validate_target_age(target_age)
        return self.person1.get_probability_of_death_by_age(
            target_age
        ) * self.person2.get_probability_of_death_by_age(target_age)

    def get_probability_of_both_reaching_target_age(self, target_age: int):
        """Returns the probablity that both of this couple will reach target age."""
        self.person1.validate_target_age(target_age)
        self.person2.validate_target_age(target_age)
        return self.person1.get_probability_of_living_to_age(
            target_age
        ) * self.person2.get_probability_of_living_to_age(target_age)

    def get_probability_of_exactly_one_reaching_target_age(self, target_age: int):
        """Returns the probablity that exactly one of this couple will reach target age."""
        self.person1.validate_target_age(target_age)
        self.person2.validate_target_age(target_age)
        return (
            1
            - self.get_probability_of_both_reaching_target_age(target_age)
            - self.get_probability_of_neither_reaching_target_age(target_age)
        )
