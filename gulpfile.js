/**
 * Created by zhangjinpei on 16-2-3.
 */

(function () {
    var gulp = require('gulp');// 引入gulp
    //引入组件
    var rename = require('gulp-rename'),           // 重命名
        imagemin = require('gulp-imagemin'),       // 图片压缩
        pngquant = require('imagemin-pngquant'),   //深度压缩png图片的imagemin插件
        changed = require('gulp-changed'),         // 过滤改动的文件
        clean = require('gulp-clean'),             // 清空文件夹
        notify = require('gulp-notify');           // 提示信息

    var imgSrc = 'cloudIMG/**/*';
    var imgDest = 'cloudDestImg';

    //压缩图片。只在build任务中才压缩图片
    gulp.task('imgMin',['clean'], function () {
        return gulp.src(imgSrc)
            .pipe(changed(imgDest))
            .pipe(imagemin({
                optimizationLevel: 3,                     //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true,                        //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true,                         //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true,                          //类型：Boolean 默认：false 多次优化svg直到完全优化
                svgoPlugins: [
                    {removeViewBox: false}
                ],    //不要移除svg的viewbox属性
                use: [pngquant({quality: '65-80'})]
            }))
            .pipe(gulp.dest(imgDest))
            .pipe(notify({ message: '<%= file.relative %>' + ' compressed finished' }));
    });

    //清除任务
    gulp.task('clean', function () {
        return gulp.src('cloudDestImg/*', {read: false})
            .pipe(clean({force: true}));
    });

    gulp.task('default',function () {
        gulp.run('imgMin');
    });

})();

