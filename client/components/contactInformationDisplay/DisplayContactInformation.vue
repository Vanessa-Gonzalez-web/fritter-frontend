<!-- Form for updating contact information display (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'GetContactInformationForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/contactInformationDisplay',
      method: 'GET',
      hasBody: true,
      fields: [
      {id: 'username', label: 'Username', value: ''}
      ],
      title: 'Get Contact Information Display for User',
      callback: () => {
        const message = 'Successfully found the users contact information display!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
