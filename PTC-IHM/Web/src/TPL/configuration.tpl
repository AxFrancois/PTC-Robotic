<link rel="stylesheet" href="/CSS/configurationList.css">
<main class="mainConfig">
    <div class="formDb">
        <h1>Génération QRcode</h1>
        <form method="get" action="/PHP/SQL/QRcode/addQRcode.php">
            <label for="LabelRayon">Label Rayon : </label>
            <input name="LabelRayon" id="LabelRayon" type="text" />
            <button>Ajouter le rayon</button>
        </form>
        <h1>Génération Article</h1>
        <form method="get" action="/PHP/SQL/Article/addArticle.php">
            <label for="NomArticle">Nom Article : </label>
            <input name="NomArticle" id="NomArticle" type="text" />
            <label for="RayonArticle">Rayon Article : </label>
            <select name="RayonArticle" id="rayonselect">
                {foreach $rayons as $rayon}
                    <option value={$rayon['id_rayon']}>{$rayon['label']}</option>
                {/foreach}
            </select>
            <button>Ajouter le rayon</button>
        </form>
    </div>

    <div class="displayer">

        <div class="QRcodeSection">

            <section class="displayDb">
                <ul class="listQRcode">
                    {foreach $rayons as $rayon}
                        <li><button type="button" onclick="makeCode('{$rayon['valeur']}')" id="QRrayon">{$rayon['label']}</button></li>
                    {/foreach}
                </ul>
            </section>

            <section class="displayQr">

                <script type="text/javascript" src="/JS/QRcode/jquery.min.js"></script>
                <script type="text/javascript" src="/JS/QRcode/qrcode.js"></script>

                <div id="qrcode" style="width:100px; height:100px; margin-top:15px;"></div>

                <script type="text/javascript">
                var qrcode = new QRCode(document.getElementById("qrcode"), {
                    width : 151,
                    height : 151
                });

                function makeCode (code) {
                    console.log(code);
                    qrcode.makeCode(code);
                }

                </script>
            </section>

        </div>
        <div class="CodeBarreSection">

            <section class="displayDb">
                <ul class="listQRcode">
                    {foreach $articles as $article}
                        <li><button type="button" onclick="JsBarcode('#barcode', '{$article['code']}')" id="CBarticle">{$article['nom']}</button></li>
                    {/foreach}
                </ul>
            </section>

            <section class="displayQr">

                <script type="text/javascript" src="/JS/Codebarre/JsBarcode.ean-upc.min.js"></script>

                <svg id="barcode"></svg>
                
            </section>

        </div>

    </div>

</main>