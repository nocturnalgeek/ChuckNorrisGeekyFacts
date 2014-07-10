
function tweet(customAttributes) {
  openPopUp(getPopUp(customAttributes));
};

function getPopUp(customAttributes) {
  // default attributes
  defaultAttributes = {
    'message' : '',
    'url'     : window.location.href,
    'height'  : 450,
    'width'   : 550,
    'top'     : $(window).height()/2 - 225,
    'left'    : $(window).width()/2
  };
  // merge default attributes with the one eventually passed to the function
  var popUp = $.extend(defaultAttributes, customAttributes);
  popUp.message = prepareMessage(popUp);
  return popUp;
}

function prepareMessage(popUp) {
  var tweetLengthLimit = 140;
  var tweetUrlLengthLimitForHTTP = 22;
  var tweetUrlLengthLimitForHTTPS = 23;
  var numberOfSpaceAfterUrl = 1;
  var trimString = '...';
  var tweetUrlLengthLimit = window.location.protocol === "https:" ?
                            tweetUrlLengthLimitForHTTPS :
                            tweetUrlLengthLimitForHTTP;
  var tweetTextLengthLimit = tweetLengthLimit - tweetUrlLengthLimit - numberOfSpaceAfterUrl - trimString.length;
  var message = popUp.message.substring(0, tweetTextLengthLimit) + (tweetTextLengthLimit <= popUp.message.length ? trimString : '');
  return encodeURIComponent(message);
}

function openPopUp(popUp) {
  window.open('http://twitter.com/share?url=' + popUp.url +
              '&text=' + popUp.message +
              '&',
              'twitterwindow',
              'height=' + popUp.height +
              ', width=' + popUp.width +
              ', top=' + popUp.top +
              ', left=' + popUp.left +
              ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
}


