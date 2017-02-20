class TestDataGenerator extends Base {

  constructor(){
    super();
    this.dropPetowners(()=>{
      this.generatePetOwners();
    });

  }

  randomItemFromArray(arr){
    return arr[Math.floor(Math.random()*arr.length)];
  }

  randomNum(min,max){
    var diff = max - min;
    return min + Math.round(0.5 + Math.random()*diff);
  }

  dropPetowners(callback){
    this.db.dropPetowners(callback);
  }

  generatePetOwners(howMany = 10){

    // Some data to seed from
    var firstNames = [
      'Anna','Bertil','Cecilia','David','Erika','Fredrik',
      'Gabriella', 'Hugo', 'Ingrid', 'Jacob', 'Karolina', 'Leo'
    ];
    var lastNames = [
      'Svensson', 'Karlsson', 'Olsson', 'Bengtsson', 'Davidsson',
      'Efraimsdotter', 'Knutsson', 'Khwaja', 'Malm', 'Frisk'
    ];

    // Create a new list of petowners
    var list = new PetOwnerList();
    for(var i = 0; i < howMany; i++){
      list.push({
        firstName: this.randomItemFromArray(firstNames),
        lastName: this.randomItemFromArray(lastNames),
        birthDate: 
          this.randomNum(1920,2010) + '-' +
          this.randomNum(1,12) + '-' + 
          this.randomNum(0,28)
      });
    }

    // Write the list to DB
    list.writeToDb(()=>{

      console.log("Written to DB!",list);
      // Now read it back into a list to confirm
      var listFromDb = new PetOwnerList();
      listFromDb.readAllFromDb(()=>{
        console.log("Read from DB",listFromDb);
      });

    });
  }

  static get sqlQueries(){
    return {
      dropPetowners: `
        DROP TABLE IF EXISTS petowners 
      `
    }
  }


}