/**
 * 模糊搜索方法封装
 */
class SearchFilter {
    constructor(){
        this.queryName = '';
    }
    publicRemoteMethod(option) {
        if (option.query !== '') {
            this.queryName=option.query;
            option.searchOption.loading = true;
            this.requestRoadSideTypeahead(option);
        } else {
            option.searchOption.filterOption = option.searchOption.defaultOption;
        }
    }
    remoteMethodClick(searchOption, searchObj, key, searchUrl) {
        this.queryName = searchObj[key];
        if(!searchOption.defaultFlag) {
            searchOption.loading = true;
            this.requestRoadSideTypeahead({
                query: '',
                searchOption: searchOption,
                searchObj: searchObj,
                key: key
            });
            if(searchObj[key]) {
                this.queryName = searchObj[key];
            }else {
                searchOption.filterOption = searchOption.defaultOption;
            }
        }
    }
    requestRoadSideTypeahead(option) {
        let _params = Object.assign({}, 
            {
                field: option.key,
                value: option.query
            }, 
            option.searchOption.otherParams ? option.searchOption.otherParams : {}
        );
        option.searchOption.request(_params).then(res => {
            option.searchOption.loading = false;
            if(!option.searchOption.defaultFlag) {
                option.searchOption.defaultOption = res.data || [];
                option.searchOption.defaultFlag = true;
            }
            option.searchOption.filterOption = res.data;
        }).catch(err => {
            option.searchOption.loading = false;
        });
    }
    clearFunc(searchOption) {
        searchOption.filterOption = searchOption.defaultOption;
    }
    remoteMethodBlur(searchObj, key) {
        searchObj[key] = this.queryName;
        this.queryName = "";
    }
}
export default SearchFilter;
