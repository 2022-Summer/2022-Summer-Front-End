<template>
    <div>
        <el-form :model="form" label-width="80px">
            <el-form-item label="文件名称">
                <el-input :placeholder="form.fileName" disabled></el-input>
            </el-form-item>
            <el-form-item label="文件格式">
                <el-radio-group v-model="form.fileFormat">
                    <el-radio label="Word"></el-radio>
                    <el-radio label="PDF"></el-radio>
                    <el-radio label="Markdown"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="download">下载</el-button>
                <el-button @click="back">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form:{
                fileName:'待下载文件',//created时赋值为文件名字
                fileFormat:''
            }
        };
    },
    created() {
    },
    methods: {
        download(){//下载后的文件命名为this.form.fileName;格式为this.form.fileFormat
            
        },
        back(){
            this.$router.back;
        }
    }
}
</script>