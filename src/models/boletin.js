class Boletin {
  id = 0;
  title = "";
  description = "";
  created_at = new Date();
  update_at = new Date();
  published_at = new Date();
  cwe_id = null;

  constructor(
    id,
    title,
    description,
    created_at,
    update_at,
    published_at,
    cwe_id
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.created_at = created_at;
    this.update_at = update_at;
    this.published_at = published_at;
    this.cwe_id = cwe_id;
  }

  //Getters
  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getCreatedAt() {
    return this.created_at;
  }

  getUpdateAt() {
    return this.update_at;
  }

  getPublishedAt() {
    return this.published_at;
  }

  getCweId() {
    return this.cwe_id;
  }

  //Setters
  setId(id) {
    this.id = id;
  }

  setTitle(title) {
    this.title = title;
  }

  setDescription(description) {
    this.description = description;
  }

  setCreatedAt(created_at) {
    this.created_at = created_at;
  }

  setUpdateAt(update_at) {
    this.update_at = update_at;
  }

  setPublishedAt(published_at) {
    this.published_at = published_at;
  }

  setCweId(cwe_id) {
    this.cwe_id = cwe_id;
  }

  getValues() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      created_at: this.created_at,
      update_at: this.update_at,
      published_at: this.published_at,
      cwe_id: this.cwe_id,
    };
  }
}

module.exports = Boletin;
