
var Pager = function(inputArray, pageSize){
    this.input = $('<input>');
    this.page = $('<div>');
    this.pages = $('<div>').addClass('pager');
    $(this.page).data('inputData',[]);
    this.pageNumber =  0;
    this.activePage = 0;

    while(inputArray.length > 0){

        var arraySplit = inputArray.splice(0,pageSize);
        console.log(arraySplit);
        var newPage  = $(this.page).clone();
        newPage.data('inputData',[]);
        newPage.data('inputData').push(arraySplit);
        newPage.data('pageNumber',this.pageNumber);
        newPage.addClass(this.formatPageNumber(this.pageNumber));
        newPage.addClass('pager-page');
        this.processNewInputs(newPage);
        $(this.pages).append(newPage);
        this.pageNumber++;
    }
    $('body').append(this.pages);
    this.applyStyles();
    this.addNavigation();
    this.assignButtons();
    this.addSubmitButton();
};

Pager.prototype = {

    processNewInputs:function(pageWithInputs){

        for(var i = 0; i < $(pageWithInputs).data('inputData')[0].length; i++){
            var newInput = $(this.input).clone();
            $(newInput).addClass(this.formatPageNumber($(pageWithInputs).data('pageNumber')));
            $(newInput).addClass('button md ghost');
            //console.log($(pageWithInputs).data('inputData')[0][i]['name']);
            newInput.attr('placeholder',$(pageWithInputs).data('inputData')[0][i]['name']);
            pageWithInputs.append(newInput);
        }
    },
    formatPageNumber:function(pageNumber){
        pageNumber = pageNumber.toString();
        var pageNumberClass = ("page-"+pageNumber);
        return pageNumberClass;
    },
    applyStyles:function(){
        $('.pager').find('div.pager-page').not('.page-0').hide();
        $('.pager-navi').show();
    },
    addNavigation: function(){
        var navi = $('<div>');
        navi.addClass('pager-navi text-center');
        var backButtonContainer = $('<div>').addClass('col-xs-6');
        var backButton = $('<div>').addClass('pager-back-button button ghost');
        backButton.append('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
        backButtonContainer.append(backButton);

        var forwardButtonContainer = $('<div>').addClass('col-xs-6');
        var forwardButton = $('<div>').addClass('pager-forward-button button ghost');
        forwardButton.append('<i class="fa fa-chevron-right" aria-hidden="true"></i>');
        forwardButtonContainer.append(forwardButton);

        navi.append(backButtonContainer);
        navi.append(forwardButtonContainer);

        $('.pager').append(navi);
    },
    assignButtons: function(){
        var activePage = this.activePage;
        $('.pager-back-button').click(function(){
            var lastPage = formatPageNumber(--activePage);
            console.log(lastPage);
            $('.pager').find('div.pager-page').not('.'+lastPage).hide();
            $('.pager').find('div.pager-page'+('.'+lastPage)).fadeIn();
        });

        $('.pager-forward-button').click(function(){
            var nextPage = formatPageNumber(++activePage);
            console.log(nextPage);
            $('.pager').find('div.pager-page').not('.'+nextPage).hide();
            $('.pager').find('div.pager-page'+('.'+nextPage)).fadeIn();
        });
    },
    addSubmitButton:function(){
        var lastPageIndex = $('.pager').find('.pager-page').length;
        var submitButton = $('<div>').addClass('pager-submit-button button cta md');
        submitButton.text("Submit");
        $(submitButton).click(function(){
            console.log("Theoretically, I've submitted your post for you. :)");
            //Post values to whoever you want
        });
        $($('.pager').find('.pager-page')[lastPageIndex-1]).append(submitButton);
    }
};

function formatPageNumber(pageNumber){
    pageNumber = pageNumber.toString();
    var pageNumberClass = ("page-"+pageNumber);
    return pageNumberClass;
}