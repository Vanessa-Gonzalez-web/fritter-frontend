<!-- Form for adding an admin to a group (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'AddAdminForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/groupTagging?groupUsername=username1&addedAdminUsername=username2&action=addAdmin',
      method: 'PUT',
      hasBody: true,
      fields: [
      {id: 'groupUsername', label: 'Group Username', value: ''},
      {id: 'addedAdminUsername', label: 'New Admin Username', value: ''},
      {id: 'action', label: 'Action (Do not change)', value: 'addAdmin'}
      ],
      title: 'Add New Admin',
      callback: () => {
        const message = 'Successfully added admin!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>