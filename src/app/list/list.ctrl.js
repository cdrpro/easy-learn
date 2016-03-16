'use strict';

class ListController {
    constructor($scope, collection, dbService) {
        'ngInject';

        this.collection = collection;

        $scope.$watch('list.collection.list', (val, oldVal) => {
            if (!angular.equals(val, oldVal)) {
                dbService.updateCollection(this.collection);
            }
        }, true);
    }

    addToCollection = (word) => {
        this.collection.list.unshift(word);
    };

    removeFromCollection(index) {
        this.collection.list.splice(index, 1);
    }
}

export default ListController;
