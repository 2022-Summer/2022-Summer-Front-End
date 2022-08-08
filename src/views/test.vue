<script>
import qs from "qs";
export default {
        methods: {
    get:function(){
        this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/team/wordcenter/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        params: {
          teamid: this.$store.state.teamid
        }
        })
        .then((res) => {
          switch (res.data.errno){
            case 0:
              this.doc=res.data.projects;
              break;
          }
        })
        .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });      
    }
    },
    downloadword(val){
      let url = 'http://120.46.200.79:8080/api/project/downloadword/?wordid=' + val + '&type=' + 'this.filetype';
      this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/project/downloadword/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        params: {
          wordid: val,
          //filetype:this.filetype
        }
      })
          .then((res) => {
            switch (res.data.errno) {
              case 0:
                break;
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          });
      window.open(url, '_blank');
    }
}
</script>