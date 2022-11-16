<!-- Form for removing a member from a group (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'RemoveAdminForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/groupTagging?groupUsername=username1&removedAdminUsername=username2&action=removeAdmin',
      method: 'PUT',
      hasBody: true,
      fields: [
      {id: 'groupUsername', label: 'Group Username', value: ''},
      {id: 'removedAdminUsername', label: 'Removed Admin Username', value: ''},
      {id: 'action', label: 'Action (Do not change)', value: 'removeAdmin'}
      ],
      title: 'Remove an Admin',
      callback: () => {
        const message = 'Successfully removed admin!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>