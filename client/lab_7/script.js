function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// As the last step of your lab, hook this up to index.html
function restoArrayMake(dataArray) {
  // console.log('fired datahandler');
  // console.table(dataArray);
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[restNum];
  });
  return listItems;
  /* range.forEach((item) => {
    console.log('range item', item);
  }); */
}

function createHtmlList(collection) {
  // console.table(collection);
  const targetList = document.querySelector('.resto-list');
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const {name} = item;
    const displayName = name.toLowerCase();
    const injectThisItem = `<li>${displayName}</li>`;
    targetList.innerHTML += injectThisItem;
  });
}

async function mainEvent() {
  // the async keyword means we can make API requests
  const form = document.querySelector('.main_form'); // change this selector to match the id or classname of your actual form
  const submit = document.querySelector('.submit_button');

  const resto = document.querySelector('#resto_name');
  const zipcode = document.querySelector('#zipcode');

  submit.style.display = 'none';

  const results = await fetch(
    '/api/foodServicesPG'
  ); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object

  // console.table(arrayFromJson.data); // this is called "dot notation"
  // arrayFromJson.data - we're accessing a key called 'data' on the returned object
  // it contains all 1,000 records we need
  if (arrayFromJson.data.length > 0) {
    // this statement is to prevent a race condition on data load
    submit.style.display = 'block';

    let currentArray = [];
    resto.addEventListener('input', async (event) => {
      console.log(event.target.value);

      if (currentArray.length < 1) {
        return;
      }
      const selectResto = currentArray.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerValue = event.target.value.toLowerCase();
        return lowerName.includes(lowerValue);
      });
      console.log(selectResto);
      createHtmlList(selectResto);
    });

    zipcode.addEventListener('input', async(event) => {
      console.log(event.target.value);
      if (currentArray.length < 1) {
        return;
      }
      const selectResto = currentArray.filter((item) => {
        const lowerzip = item.zip.toLowerCase();
        const lowerValue = event.target.value.toLowerCase();
        return lowerzip.includes(lowerValue);
      });
      console.log(selectResto);
      createHtmlList(selectResto);
    });

    form.addEventListener('submit', async (submitEvent) => {
      // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      // console.log('form submission'); // this is substituting for a "breakpoint"
      currentArray = restoArrayMake(arrayFromJson.data);
      console.log(currentArray);
      createHtmlList(currentArray);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
