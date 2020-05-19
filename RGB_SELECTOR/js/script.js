window.addEventListener('load',rgb_selector)

var rgbColor = null;

function rgb_selector() {
  function editColorbox(event) {

    rgbColor = 'rgb(' + redRange.value + ',' + greenRange.value + ','
    + blueRange.value + ')'

    console.log(rgbColor);

    redValue.value = redRange.value;
    greenValue.value = greenRange.value;
    blueValue.value = blueRange.value;

    document.querySelector('.rgb_box').style.setProperty('background-color',rgbColor);
  }

  var redRange = document.querySelector('#red_slider');
  var redValue = document.querySelector('#red_value');
  redRange.addEventListener('input',editColorbox);

  var greenRange = document.querySelector('#green_slider');
  var greenValue = document.querySelector('#green_value');
  greenRange.addEventListener('input',editColorbox);

  var blueRange = document.querySelector('#blue_slider');
  var blueValue = document.querySelector('#blue_value');
  blueRange.addEventListener('input',editColorbox);

}