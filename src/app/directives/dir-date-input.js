PHI.directive('dateInput', function ($rootScope, $filter) {

	"use strict";

	return {

		restrict: 'E',
		replace: true,
		template:   '<input type="text" class="dateInputType" ' +
					'ng-model="model" ng-pattern="dateVal" ng-maxlength="10" ' +
					'ng-change="checkIfValid()">',
		scope: {

			'model': '='
		},
		link: function (scope, element, attr) {

			scope.dateVal = /^[0-9]{2}[\/]{0,1}[0-9]{2}[\/]{0,1}([0-9]{2}|[0-9]{4})$/;

			scope.$watch(element);

			element[0].onkeydown = function (e) {

				var value = this.value;

				console.log(e.keyCode);

				if (e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 9 && e.keyCode !== 91) {

					if (e.keyCode < 37) {

						e.preventDefault();

					} else if (e.keyCode > 40 && e.keyCode < 48) {

						e.preventDefault();

					} else if (e.keyCode > 57 && e.keyCode < 96) {

						e.preventDefault();

					} else if (e.keyCode > 105) {

						e.preventDefault();
					}
				}
			};

			scope.checkIfValid = function () {

				var that = element[0],
					newEventDateMil,
					parsedEventDate;

				if (that.value.length > 6) {

					newEventDateMil = Date.parse(that.value);
					parsedEventDate = $filter('date')(newEventDateMil, 'MM/dd/yyyy');

					console.log(that.value + ' ' + parsedEventDate);

					if (that.value !== parsedEventDate) {

						console.log('Your start date is not a valid date');

						$rootScope.invalidDate = true;

					} else {

						console.log('they should be equal');

						$rootScope.invalidDate = false;

						$rootScope.$digest();
					}
				}
			};

			element[0].onfocus = function () {

				var el = element[0];

				angular.element(el).attr('placeholder', 'MM/DD/YYYY');
			};

			element[0].onblur = function () {

				var value = this.value,
					el = element[0],
					dateArray,
					currentYear = new Date().getFullYear(),
					fourDigitYear;

				if (/[0-9]{2,2}[\/]{0,1}[0-9]{2,2}[\/]{0,1}[0-9]{2,2}/.test(value)) {

					dateArray = value.split('/');
					currentYear = currentYear.toString().slice(2,4);
					currentYear = parseInt(currentYear, 10);

					if (dateArray[2] <= (currentYear + 2) && dateArray[2].length === 2) {

						fourDigitYear = '20' + dateArray[2].toString();

						this.value = dateArray[0] + '/' + dateArray[1] + '/' + fourDigitYear;

					} else if (dateArray[2] > (currentYear + 1) && dateArray[2].length === 2) {

						fourDigitYear = '19' + dateArray[2].toString();

						this.value = dateArray[0] + '/' + dateArray[1] + '/' + fourDigitYear;
					}
				}

				scope.checkIfValid();

				angular.element(el).removeAttr('placeholder');
			};

			element[0].onkeyup = function (e) {

				var value = this.value,
					length = value.length,
					subStr;

				if (e.keyCode !== 8 && e.keyCode !== 46) {

					if (length === 2 || length === 5) {

						this.value = value + '/';

					} else if (length === 1) {

						if (e.keyCode === 191 || e.keyCode === 189 || e.keyCode === 109 || e.keyCode === 111) {

							this.value = '0' + value + '/';
						}
					} else if (length === 4) {

						if (e.keyCode === 191 || e.keyCode === 189 || e.keyCode === 109 || e.keyCode === 111) {

							subStr = value.charAt(3);

							value = value.replace(/\/[0-9]/, '/0' + subStr + '/');

							this.value = value;
						}
					}
				}
			};
		}
	};
});