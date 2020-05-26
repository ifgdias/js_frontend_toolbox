  let userList = [];
  let filteredUserList = []; 
  let searchHistory = [];

  let userViewHTML = null;
  let userStatisticsHTML = null;
  let inputField = null;
  let btn = null;
  let strSearch = null;
  let userView = null;

  let sex = [];
  let ageSum = 0;
  let ageMean = 0;

window.addEventListener('load',() => {

  userView = document.querySelector('#user-view');
  userStatistics = document.querySelector('#user-statistics');
  inputField = document.querySelector('#str-search');
  found = document.querySelector('.found');
  btn = document.querySelector('a');
  inputField.focus();

  fetchUsers();
})

async function fetchUsers() {
  const fetchData = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await fetchData.json();
  
  userList = json.results.map(user => {
    const {gender, name, dob, picture} = user;
    return {
      gender : gender,
      //firstName : name.first,
      //lastName : name.last,
      fullName : `${name.first} ${name.last}`,
      age : dob.age,
      img : picture.thumbnail
    }
  });
  render();
};

const render = () => {
  inputField.addEventListener('keyup',searchName);
  btn.addEventListener('click',searchName);
  found.addEventListener('click',returnHistory);
  inputField.focus();
};

const searchName = (e) => {

  str = inputField.value.toLowerCase();

  if (e.key === 'Enter' || e.type === 'click') {
    saveSearch(str);
  }

  filteredUserList = userList.filter(user => {
    let baseName = user.fullName.toLowerCase();
    return baseName.includes(str)
  });

  let userViewHTML = `
  <div>
  <span id="summary">${filteredUserList.length} usuário(s) encontrado(s)</span>
  <ul id="userlist">
  `;

  filteredUserList.forEach(user => {
    const {img, fullName, age} = user;
    let userListHTML = `
      <li><img id="profile" src="${img}"> ${fullName}, ${age} anos</li>
    `;
    userViewHTML += userListHTML;
  });

  userViewHTML += '</ul></div>';

  userView.innerHTML = userViewHTML;
  userStatistics.innerHTML = statistics(filteredUserList);

  render();

};

const statistics = (filteredUsers) => {
  let ageMean = _.round(_.meanBy(filteredUsers,'age'),2);
  let ageSum = _.sumBy(filteredUsers,'age');
  let sex = _.countBy(filteredUsers, 'gender');

  const statisticsHTML = `
    <ul="statistics">
      <li>Sexo masculino: ${sex.male}</li>
      <li>Sexo feminino: ${sex.female}</li>
      <li>Soma das idades: ${ageSum}</li>
      <li>Média das idades: ${ageMean}</li>
    </ul>`

  return statisticsHTML;
};

const saveSearch = (str) => {
  searchHistory = [...searchHistory,str];
  let foundHTML = "";
  searchHistory.forEach(found => {
    foundChips = `
    <div class='chip'>${found}</div>
    `;
    foundHTML += foundChips
  });
  found.innerHTML = foundHTML;
  render();
};

const returnHistory = (e) => {
  inputField.value = e.target.textContent;
}
