<!-- Form for creating contact information display (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateContactInformationForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/contactInformationDisplay',
      method: 'POST',
      hasBody: true,
      setContactDisplay: true,
      setUsername: true,
      setContactNumber: true,
      setContactEmail: true,
      setContactWebsite: true,
      setContactAddress: true,
      fields: [
      {id: 'contactInformationDisplayed', label: 'Should Contact Information Be Displayed? (yes or no):', value: ''},
      {id: 'username', label: 'Username', value: ''},
      {id: 'contactNumber', label: 'Contact Number', value: ''},
      {id: 'contactEmail', label: 'Contact Email', value: ''},
      {id: 'contactWebsite', label: 'Contact Website', value: ''},
      {id: 'contactAddress', label: 'Contact Address', value: ''}
      ],
      title: 'Create Contact Information Display for User',
      callback: () => {
        const message = 'Successfully created a contact information display!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>