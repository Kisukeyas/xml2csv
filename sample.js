const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
const fs = require('fs');
const csv = require('csv');
const iconv = require('iconv-lite');

// 設定項目1
const config = {
    // 読み込みたいxmlファイルのPathを指定
    inputFilePath: "./text.xml",
    // 出力したい先のPathを指定
    outputFilePath: "./text.csv",
    // 出力したい文字コードに設定
    encode: "Shift_JIS",
    // csvの1行目の項目を書く
    csvHeader: ["オーダーNo", "送付先お名前", "請求先お名前"],
    // xmlnsがある場合はURLを記述
    xmlns: ""
}

// xmlファイル読み込み
const xml = fs.readFileSync(config.inputFilePath, "utf8");
const xmlDom = new dom().parseFromString(xml);
const select = xpath.useNamespaces({"xmlns": config.xmlns});

// 設定項目2 取ってきたい値のパスを指定
const xmlPath = {
    purchaseOrderRoot: "xmlns:PurchaseOrders/xmlns:PurchaseOrder",
    shippingAddress: "xmlns:Address[@Type='Shipping']/xmlns:",
    billingAddress: "xmlns:Address[@Type='Billing']/xmlns:",
};


const purchaseOrderDataMap = {   
    // OrderNumber
    purchaseOrderNumber: "@PurchaseOrderNumber",
    // Shipping Name
    shippingName: `${xmlPath.shippingAddress}Name/`,
    // Blling Name
    billingName: `${xmlPath.billingAddress}Name/`,
};

let csvRecord = [];

// csvの項目を記述
csvRecord.push(config.csvHeader);

const purchaseOrderRoot = select(xmlPath.purchaseOrderRoot, xmlDom);

for(const purchaseOrder of purchaseOrderRoot) {
    const purchaseOrderNumber = select(`string(${purchaseOrderDataMap.purchaseOrderNumber})`, purchaseOrder);
    const shippingName = select(`string(${purchaseOrderDataMap.shippingName}/text())`, purchaseOrder);
    const billingName = select(`string(${purchaseOrderDataMap.billingName}/text())`, purchaseOrder);

    // csvの項目順に合わせる
    csvRecord.push([purchaseOrderNumber, shippingName, billingName]);
}

console.log(csvRecord)

// csvファイルを書き出し
csv.stringify(csvRecord, function(err, output) {
    // 書き出し文字コードをShift＿JISに変更（文字化け対策）
    const changeCharacCode = iconv.encode(output, config.encode);
    fs.writeFileSync(config.outputFilePath, changeCharacCode);
});