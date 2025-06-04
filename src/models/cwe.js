class CWE {
  id = 0;
  cwe_code = "";
  name = "";
  created_at = new Date();
  update_at = new Date();

  constructor(id, cwe_code, name, created_at, update_at) {
    this.id = id;
    this.cwe_code = cwe_code;
    this.name = name;
    this.created_at = created_at;
    this.update_at = update_at;
  }

  //Getters
  getId() {
    return this.id;
  }

  getCweCode() {
    return this.cwe_code;
  }

  getName() {
    return this.name;
  }

  getCreatedAt() {
    return this.created_at;
  }

  getUpdateAt() {
    return this.update_at;
  }

  //Setters
  setId(id) {
    this.id = id;
  }

  setCweCode(cwe_code) {
    this.cwe_code = cwe_code;
  }

  setName(name) {
    this.name = name;
  }

  setCreatedAt(created_at) {
    this.created_at = created_at;
  }

  setUpdateAt(update_at) {
    this.update_at = update_at;
  }

  getValues() {
    return {
      id: this.id,
      cwe_code: this.cwe_code,
      name: this.name,
      created_at: this.created_at,
      update_at: this.update_at,
    };
  }
}

module.exports = CWE;
