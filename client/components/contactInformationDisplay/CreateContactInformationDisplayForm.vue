<!-- Form for creating freets (block style) -->

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
      fields: [
        {id: 'content', label: 'Content', value: ''}
      ],
      title: 'Create Contact Information Display for User',
      refreshFreets: true,
      callback: () => {
        const message = 'Successfully created a contact information display!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>