<!-- Form for getting group members (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'GetGroupInformationForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/groupTagging?groupUsername=username',
      method: 'GET',
      hasBody: true,
      fields: [
      {id: 'groupUsername', label: 'Group Username', value: ''}
      ],
      title: 'Get Group Members',
      callback: () => {
        const message = 'Successfully found the group information!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
