import { shallowMount } from '@vue/test-utils'
import i18n from '@locales/i18n'

import BasicTable from './BasicTable'

import { CandidatesList } from '@models/candidate'

describe('BasicTable', () => {
  const props = {
    loading: false,
    candidates: new CandidatesList(),
    editable: false
  }

  const wrapper = shallowMount(
    BasicTable,
    {
      propsData: props,
      stubs: ['v-layout', 'v-data-table', 'v-flex', 'v-text-field'],
      mocks: {
        $t: key => i18n.t(key)
      }
    })

  it('has a name', () => {
    expect(BasicTable.name).toEqual('BasicTable')
  })

  it('props', () => {
     expect(wrapper.props().loading).toEqual(false)
     expect(wrapper.props().candidates.models.length).toEqual(0)
     expect(wrapper.props().editable).toEqual(false)
   })

   it('data.search', () => {
    expect(wrapper.vm.search).toEqual('')
   })

   it('data.headers', () => {
    expect(wrapper.vm.headers).toEqual([{
      sortable: false,
      value: 'action',
    },
    {
      text: i18n.t('components.employees.table.cols.name'),
      value: 'fullname'
    }])
   })

  it('matches do snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
