class PetOwnerList extends List {

  constructor(items){
    super(PetOwner,items);
    this.db.createTableIfNeeded();
  }

  writeToDb(callback){
    var co = 0, listLength = this.length;
    function callbackEach(res){
      co++;
      if(co == listLength){ callback(); }
    }
    for(let petowner of this){
      petowner.insertInDb(callbackEach);
    }
  }

  readAllFromDb(callback){
    this.db.readAll((data)=>{
      this.push.apply(this,data);
      callback();
    });
  }

  static get sqlQueries(){
    return {
      createTableIfNeeded: `
        CREATE TABLE IF NOT EXISTS petowners (
          id int(11) unsigned NOT NULL AUTO_INCREMENT,
          firstName varchar(255) DEFAULT 'John',
          lastName varchar(255) DEFAULT 'Doe',
          birthDate date DEFAULT '2000-01-01',
          PRIMARY KEY (id)
        )
      `,
      readAll: `
        SELECT * FROM petowners
      `
    }
  }

}
