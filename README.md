# XML to CSV tool

## How To Use
ターミナルで今回解凍したファイルのディレクトリまで移動します

```bash
$ cd 任意のディレクトリ/xml2csv
```

npmを使用して今回必要なmoduleをインストールします

```bash
$ npm install
```

sample.jsのファイルを開いて
「// 設定項目」　下のconfigオブジェクトの中身を編集していきます
1. inputFilePath
    変換したいxmlファイルのパスを指定します
2. outputFilePath
    出力したいcsvファイルの出力先を指定します(csvファイルを用意しなくても指定した先に指定したファイル名でcsvファイルが出力されます)
3. encode
    出力したい文字コードに変換して出力します(文字コードによっては、csvを読み込んだ先で文字化けする可能性があります)
4. csvHeader
    CSVファイルの1行目に来る文字列を指定します
5. xmlns(なければ無視して良い)
    <customers xmlns="http://www.demandware.com/xml/impex/customer/2006-10-31">
    今回変換したいxmlファイルの二行目のcustomers要素の属性(xmlns)のURLをコピー＆ペーストします

最後にターミナル上で下記を実行すれば、任意のcsvファイルが生成されます

```bash
$ node sample.js
```