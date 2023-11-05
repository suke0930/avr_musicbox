# avr_musicbox
令和5年の文化祭で作成した電子オルゴールのソースと開発資料です。
atmega328pもしくはadruno unoを想定しています。





<details><summary>ディレクトリ構造</summary>





-   /Midi2Arduino_original
    -   
    フォーク元のレポジトリ(Midi2Arduino)です。
-   /midi_converter
    -   
    既存のMIDIの音が被っている部分（同時発音の和音ではありません）を自動的に除去するツールのソースコードです。
    -   使用方法 
    
        converte.exeにmidiファイルをドラッグ&ドロップするとedit.midという変換後ファイルがの生成されます。
        同時発音和音は手動で除去しなくてはいけないことに留意してください。
        和音がある場合正常に動作しません

-   /midi
    -   
    -   今回使用したmidiです。
    -   権利的に危ないものは必要な際に別途記載します

-   /arduino/MidiPlayer
    -   
    -   実際の変換に使うソフト（midi2adruno）です。
    元のソースコードから一部改変されており、使うピンやボタンを使った再生/停止システムなどがあるのでソースコードは改変しないことをおすすめします。（あなたがarduinoに関する関する教養がある場合はむしろこのコードを改善してください）

</details>
</br>

# 使用方法
<details><summary>使用方法</summary>
1. まず変換したいmidiを用意します
<br>
2. 変換したいmidiを2チャネルのみに絞り、同時発音（発音位置が同じ）和音を消します
<br>
<br>
この作業には<a href=https://takabosoft.com/domino>Domino</a>を推奨します
<br>
<br>
3. converte.exeに編集したmidiをドラッグ&ドロップします
<br>
4. (推奨)converte.exeが吐き出したedit.midをリネームします
<br>
5. run.batでmidiを変換します。<br>

### 注意点
元のコードでは12番と9番をスピーカーのピンにアサインしています。
なにか特別な改変がない限り、これらにアサインしてください。
（dominoを用いた場合、トラック0が虚無のトラックになることがあります。この場合はどこにアサインしても問題ありません）
なんならあとからmelody.hを修正してもおｋ
<br>
<br>
6. arduino ideで読み込ませ、hex書き出しもしくは書き込みをする
## 注意点
![img](https://github.com/suke0930/avr_musicbox/assets/121690168/2ab1f0bb-a36f-4e41-a3f2-30ff72e2e766)
</br>
このように一つも音が存在しないトラックが生成される場合があります。
これらは不要なので、定義をすべて消してください。

### 修正例
</br>

![img](https://github.com/suke0930/avr_musicbox/assets/121690168/16b0c778-884d-4c9f-b054-f762708c4ae2)
</details>
<br>

# 使用方法（マイコン側）
<details><summary>使用方法（マイコン側）</summary>

1. VCCとGNDに配線をします。AVCCとかアナログ側のGNDはいらないはず<br>
2. 13版にLEDを配置します。<br>
3. 9番と12番にそれぞれスピーカーを配置します。<br>
4. 0番にスイッチを繋げます。INPUT_PULLUPが指定されているので片方はGNDに繋いでください。<br>
5. (必要に応じて)水晶を繋げます。<br>
6. スイッチを押します。動かないなら何かがおかしいです。<br>
</details>

# 詳細に関するなにか or お問い合わせ
下記にお願いします。
@suke0930
Email akitochuanshanh@gmail.com
discord: suke_6183
