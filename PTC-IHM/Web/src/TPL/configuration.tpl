<main>
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

    <section>
        <ul>
            {foreach $rayons as $rayon}
                <li><button type="button" onclick="makeCode('{$rayon['valeur']}')" id="QRrayon">{$rayon['label']}</button></li>
            {/foreach}
        </ul>
    </section>

    <section>

        <script type="text/javascript" src="/JS/QRcode/jquery.min.js"></script>
        <script type="text/javascript" src="/JS/QRcode/qrcode.js"></script>

        <div id="qrcode" style="width:100px; height:100px; margin-top:15px;"></div>

        <script type="text/javascript">
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            width : 115,
            height : 115
        });

        function makeCode (code) {
            console.log(code);
            qrcode.makeCode(code);
        }

        </script>
    </section>

</main>