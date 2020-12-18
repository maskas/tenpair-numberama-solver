


var script = document.createElement('script');
document.head.appendChild(script);
script.type = 'text/javascript';
script.src = "//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
await script.onload

console.log("JQuery is ready");

await new Promise(r => setTimeout(r, 1000)); // I'm not working now. I can do in a fun way.


let isMatching = function($cell1, $cell2) {
  if ($cell1 == null || $cell2 == null) {
    return false;
  }

  let val1 = parseInt($cell1.text());
  let val2 = parseInt($cell2.text());

  if (isNaN(val1) || isNaN(val2)) {
    return false;
  }

  if (val1 == val2) {
    return true;
  }

  if (val1 + val2 == 10) {
    return true;
  }

  return false;
}

let isEmptyCell = function($cell) {
  return $cell == null || isNaN(parseInt($cell.text()));
}

let strikeHorizontal = function () {
  let $root = $('#contain');
  let isFound = false;
  let $last = null;

  $root.find('tr td').each((index, cell) => {
    if (isMatching($last, $(cell))) {
      isFound = true;
      $last.click();
      $(cell).click();
      $last = null;
    }
    if (!isEmptyCell($(cell))) {
      $last = $(cell);
    }
  });
  return isFound;
}

let strikeVertical = function () {
  let $root = $('#contain');
  let isFound = false;

  let colCount = $root.find('tr').first().find('td').length;

  for(let i=1; i<=colCount; i++) {
    let $last = null;
    $root.find(`tr td:nth-child(${i})`).each((index, cell) => {
      if (isMatching($last, $(cell))) {
        isFound = true;
        $last.click();
        $(cell).click();
        $last = null;
      }
      if (!isEmptyCell($(cell))) {
        $last = $(cell);
      }
    });

  }

  return isFound;
}


let strikeAll = function() {

  let isFinished = false;
  let isTimedOut = false;
  const MAX_ITERRATIONS = 10000;


  let iterration = 1;
  while (!isFinished && iterration < MAX_ITERRATIONS) {
    let isVerticalFound = strikeVertical();
    let isHorizontalFound = strikeHorizontal();
    isFinished = !isHorizontalFound && !isVerticalFound;
    iterration++;
  }

  if (iterration == MAX_ITERRATIONS) {
    console.log("MAX complexity reached");
  } else {
    console.log("Finished");
  }

};

strikeAll();
deal();
