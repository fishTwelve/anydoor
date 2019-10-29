<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{title}}</title>
    <style>
        body {
            margin: 30px;
        }
        a {
            display: block;
            font-size: 28px;
        }
    </style>
</head>
<body>
{{#each files}}
<!-- this表示本身-->
    <a href="{{../dir}}/{{file}}">[{{icon}}]{{file}}</a>
{{/each}}
</body>
</html>