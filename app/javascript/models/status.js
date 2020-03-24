import { Model, List } from './base'

class Status extends Model {
  get defaults() {
    return {
      value: '',
      label: '',
      color: '',
      required_fields: []
    }
  }
}

class StatusesList extends List {
  get model() {
    return Status
  }
}

export { Status, StatusesList }
