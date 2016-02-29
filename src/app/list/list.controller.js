angular.module('list')
    .controller('ListController', function ($scope, $animate, localStorageService, collections, collection, listService,
                                            dbService, $timeout) {
        let ctrl = this;

        ctrl.collection = collection;

        ctrl.timer = listService.timer;
        ctrl.timer.time = localStorageService.get('time') || 1;
        ctrl.word = {
            eng: null,
            translate: null
        };

        ctrl.toggleTimer = listService.toggleTimer;
        ctrl.getTranslation = function (word) {
            if (!word) {
                return;
            }

            listService.getTranslation(word).then((translation) => {
                ctrl.word.translate = translation;
            });
        };

        $scope.$watch('list.collection.list', (val, oldVal) => {
            if (!angular.equals(val, oldVal)) {
                dbService.updateCollection(ctrl.collection);
            }
        }, true);

        $scope.$watch('list.timer.time', () => {
            localStorageService.set('time', ctrl.timer.time);
        });

        ctrl.addWord = function (word) {
            ctrl.collection.list.unshift(word);
            new Notification('New word', {
                body: word.eng + ' - ' + word.translate
            });
            
            $timeout(() => {
                listService.playAudio(word.eng);
            }, 1000);

            ctrl.word = '';
        };

        ctrl.removeWord = function (index) {
            ctrl.collection.list.splice(index, 1);
        };
    });
