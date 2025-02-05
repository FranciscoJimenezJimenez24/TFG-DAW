<?php

namespace Database\Seeders;

use App\Models\Equipo;
use App\Models\Liga;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EquipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $arrayCiudadPorPais = [
            "Inglaterra" => ["Londres", "Manchester", "Liverpool", "Birmingham", "Leeds", "Sheffield", "Bristol", "Nottingham", "Leicester", "Newcastle"],
            "España" => ["Madrid", "Barcelona", "Sevilla", "Valencia", "Bilbao", "Málaga", "Zaragoza", "Vigo", "Alicante", "Granada"],
            "Alemania" => ["Berlín", "Múnich", "Hamburgo", "Colonia", "Frankfurt", "Stuttgart", "Düsseldorf", "Leipzig", "Bremen", "Dortmund"],
            "Italia" => ["Roma", "Milán", "Nápoles", "Turín", "Palermo", "Génova", "Bolonia", "Florencia", "Venecia", "Catania"],
            "Francia" => ["París", "Marsella", "Lyon", "Toulouse", "Niza", "Burdeos", "Lille", "Estrasburgo", "Rennes", "Le Havre"],
            "Países Bajos" => ["Ámsterdam", "Róterdam", "La Haya", "Utrecht", "Eindhoven", "Groninga", "Tilburgo", "Almere", "Arnhem", "Leiden"],
            "Portugal" => ["Lisboa", "Oporto", "Coímbra", "Amadora", "Braga", "Funchal", "Évora", "Aveiro", "Vila Real", "Cascais"],
            "Argentina" => ["Buenos Aires", "Córdoba", "Rosario", "La Plata", "Mendoza", "Tucumán", "Mar del Plata", "Salta", "San Juan", "Santa Fe"],
            "Brasil" => ["São Paulo", "Río de Janeiro", "Brasilia", "Salvador", "Fortaleza", "Belo Horizonte", "Manaos", "Porto Alegre", "Curitiba", "Recife"],
            "México" => ["Ciudad de México", "Guadalajara", "Monterrey", "Cancún", "Puebla", "Tijuana", "Mérida", "León", "Querétaro", "Chihuahua"],
        ];
        $urls = [
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669822/pl8zwakqbd0qp8tjeq82.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669822/ygvcftkq72xqn7euuvwn.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669823/soph9k2ovhfz7x8oeqwm.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669824/c6l50vblgrxebxsgvbgv.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669825/fqzxtb7w964odhwmwg68.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669825/xunks9yhabfaw1dpkzxe.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669826/whz399gvqv3ynopg3rmx.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669826/otyjrdpvqu4vl05xef5s.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669827/hed80jso9hyrbhoiytxn.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669828/sqqa2k2tojiyn8mjluc3.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669828/w4etujnogp0rzoeaxpnc.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669829/y5y3l2dn2xbtimrtorzn.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669829/krscuwgiix8wkbsa1eg0.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669830/gjilsrfljlvxzrbthdit.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669830/v4vxurivjwt0ufbhcoat.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669831/qhyrxex6vargwtczvmym.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669831/um4mbtxhguvg0udgd1iq.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669832/oumzxbq3dxnsuzejhdpj.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669832/jmyovfkcjussvqvsjvak.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669833/bhgl1qwfdkbd4pjcg032.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669833/l0sfqgnas4ycfocn6mqu.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669834/xab86dwobvze8fsx9oij.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669834/kcpy4qtsstr0erhcailz.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669835/oblnkcbgcdhkv4hzhmmu.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669836/mv9bbn719em1qk4hrm1l.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669836/klelzxr4w0yu5da8di2m.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669837/dkhcwxts9juzjmj5jkzp.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669837/a2bfyb6ohhsjy7s4veyz.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669838/ydglfysxhfjdudkg7m7w.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669839/a3acw28fuf7doetv7cho.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669839/zf63s64xpnu4pqvasewa.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669840/lj6t9m4hvjujtgufvhc7.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669840/lm2tomkwupa6hezjelzu.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669841/hnegyfntcvbjrrceda6a.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669841/fuoyqkrrroodpqyrpi75.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669842/qbchwc8lnubijmsihqog.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669843/vtfoxzq4g1runiqnstbj.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669843/bpuvgbdx36eg6upl4cut.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669844/ynrc86quewy2dypu877y.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669844/qbuzcetfqxekux2mnvqw.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669845/dinys0zkuylajjhonz3u.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669845/y4wyhbpatosg4mha9x2s.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669845/hcimmfmeu8zwr4bqazfk.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669846/ufwleeempbq9jgagceks.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669847/b0bzlwwrcupgw51ddx4o.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669847/ky59pnxdo7m7tfoapijk.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669848/k3xkd12g4uxct7bjq0v9.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669848/dwzmt46fpw0hw9seola3.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669849/pajodsfgmmehzmqftc7r.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669850/a1pdebj25eksvrm6rdge.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669850/hn26wrfeobcgjnkvqotx.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669851/wnrkwwfci5601fu7c82k.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669851/jt9mmcr5xwjp4hh8e9sb.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669852/mszjnmss4omw90r7ijdm.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669853/p6skpy0l1is3bfbxsozd.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669853/cff3pbhgijb3plfmh5s4.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669854/sgjnzzrfcfvl5ob7lgpz.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669854/sv3xxfjr1qfrq0tksx8x.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669855/cuxvgho1imhf1tne5bch.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669855/p50ff5f0mhandlchvr0j.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669856/rfhiugcbst8gfpqr150l.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669856/abdggw3mw6dloplkyvzy.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669857/mljspgi65cws4emv2nzr.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669858/d83jsdsklukxu7onkcgn.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669858/jcvtnnsudkzy4kfgtxzt.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669859/c3uk5r7ixhy2eivw1vrs.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669859/bwzqezax7oh70anidmvg.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669859/oxqambj7o1rjl2bhakfk.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669860/cpmiy9n8qdaiiz35jiey.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669861/ry7mi6b22yvtxe5ofyaq.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669861/jgg4d8p9qweqij0awlqb.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669862/c8wrcq9solcpcwf3flra.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669862/hxuxsfjg3sa3x9dvqhsg.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669863/wcypaqzzgvijmonogtvl.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669863/qpbsht6gg5oa2zfngybb.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669864/ktx4uygwozs5ruemleyr.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669864/xigadnzfb1vgdi8bmwce.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669865/kex2wjzgib6zjvptor9h.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669865/nfcf9jh8mm9idqc86p9t.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669866/zbuzb5bzxc7xxxp94tre.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669866/np9zhtvxd28kgpotztlj.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669867/ipdqxdpndxvzv2mhfs4k.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669867/ykbcm2f0wtpsfyfti72j.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669868/hkeyqw3hdoaxxqfmmgy9.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669869/yuzrpkntx34m7jm4qjtn.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669870/kesato7gvnqo0joqmpq7.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669871/s0ezsimexhcwdfacqlp8.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669871/ndwjn5lok0h5yrsmzouz.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669872/nrnabjuofcybxksrrit4.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669872/bd30meotyxxtkx8mbtlo.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669873/fofrsydnn6pbt9m1rvde.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669873/h6vjv17a9cckzpw8uihh.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669874/v8vlsrdaneuezrnx4b3v.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669875/uxkqlghq2s9ulcbimsxw.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669875/tjwsahpqxyu0wncewh62.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669875/omx5bgwoubcu97zfuppk.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669876/hokxb0ylaeiissiznijt.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669876/eh96wmtu5ekiinoukdsw.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669877/falfgqxkytdgful5etnh.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669877/p8xnuy69j7krv9tcrvt2.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669878/vizvirx3bujxfeaccbcd.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669878/o8un5uhd2ck5qst5qqhm.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669879/bvewfiyh5g2tsikdcdv5.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669879/oekkwhij9htsxj68rgim.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669880/gwni8e6p6uy0qnd3yx3f.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669881/asfolcx92bkdtnbh9aga.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669881/oxre1qvfahry50apm3bq.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669882/ghsgghr7gofwu6o4uhhi.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669882/mudyy8vgqgnezrfmak3n.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669883/x7qxuzoo17d4pf4vbico.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669883/cmkaejhjmcptj93apemh.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669884/gqiwxzejhlmavjt4vbi8.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669884/peivxzjds7fordceribk.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669885/hckihsuh7cajbwuwmfbl.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669885/bjljqxfhy4y5zx7zpkuu.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669886/bac25w535tlvysqqd9aq.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669886/gk7bnttxngsmtthyiuhq.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669887/hosf8c26mqax83pcwirx.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669887/zrngu3mkqtucinox3rv3.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669888/g5yg9drgrosnmzu5zewc.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669889/tdpr1tz5sjpa8oymmmcc.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669889/acxtywjxsr5xavq33wdi.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669890/fslnp2w5jukeyrxrrzrc.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669890/xzqrbiykqjhhbvahmfov.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669891/nsjn8eqg5ppfiqugkixf.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669891/dlpaol5mukyoe7k2uh0n.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669892/ubaqaqelkcnuwynfv0gc.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669892/acnkw69d7aeqqrviiich.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669893/ul1ci8a7azcss1c64cnl.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669893/e3vlimawimv2frsemkza.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669894/nkfnxfplbcqklixzcaz4.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669894/pcsdswnotaakztxfkpkj.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669895/ofzbz04ocwsu6z7kerui.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669895/ufn5r7ez6m3vzungiu3g.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669896/zww73qlazqdibznwg4mu.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669896/gnssolfmraq0gvdnkdxx.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669897/aocltrtjhn4ftegsxaj1.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669898/dfiq4nigb0layvhy8ge9.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669898/s0gyf9fo8zwonuci8sdy.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669898/uedlybhosyyyigrcsvim.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669899/ggdiicgd1zre9qgiburp.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669899/op8hfhsn7tw4mqpcjfip.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669900/ght9bb2udacrbeqojtan.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669900/lhxuoxix6umsx7gb6j2e.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669901/f9o1dzbuevcrfwgprlih.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669902/woggotoq5rrb4wvlvuqe.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669902/nvqawd85vb9cmeurcth6.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669902/mmdw5gni6rss6hbly46t.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669903/cvvdm0evgacp8jc4ra99.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669903/fyko1lingosm0uinuhg5.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669904/kth63jlau2fjycotyaff.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669904/ddao5moehlkwawthgbyy.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669905/zr3frrmcgzcnqia5c5nl.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669906/z2du18cvosea7jou2ygi.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669906/p577ggpfvtqmrsvinlf8.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669907/wpgmcweddwj1zeqmfi4c.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669907/k2chqkckgatdevek0pch.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669908/nwup9s9bzfcwbmeuliq4.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669909/bieyqsgdhicgnde1vfpj.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669909/btkixtlyldd8lhupsrxa.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669910/cscny9ti8tykhxnhmp99.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669910/lxkqzjlrkklhhz26ydds.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669911/ipovvnqmyvwmehusvrx1.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669911/zasf3wufgmwmynqaxbyr.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669912/bpoznhxkqhzw9m74surb.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669913/nbqkimjnumyrkujtiduu.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669913/seugkqajlzogvnf2hv4e.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669914/n3pback2gvsotvo1bws2.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669914/t1k5ebamhpqgavxcugkx.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669915/qf1wp1hbrbzmrc4v7eib.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669915/egakayx9eyorgk5hjj1t.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669916/oolgrsr1aczfc3yvxigd.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669916/tcgrmvlpw4lhupkptrvn.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669916/xj91xrbmnq8ew9zjvb45.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669917/qqxjnggw4dmlf6pso9pw.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669917/wt9wbf9cqkdqd8lgq55f.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669918/gwg4idbdciqut8rbev4v.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669918/ugwxsuwmuc0rqyhud0az.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669919/ojqdhncm9lhbffswwmua.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669920/t1fekh953vewog480zrr.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669920/qalzu8todvmberskefwf.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669921/m7po4owcoudqyban6fb8.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669921/icyguax9rubbhpep6z3z.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669922/kklexzeeowhxleo5fyox.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669922/wshvcpxojmnqzrdnxysf.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669923/yj0obf0ujmprjbwjtpu8.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669923/cp1v3ac1ufit0yblkhkq.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669924/rihhy3rjqzytiqzjqcpa.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669924/zgjxzyu3yowuysvmfgcr.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669925/hywfw0ey0ahjdpmxmvui.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669925/bgac3xyn4m6rw2ar3t5q.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669926/itphmszi0mmklisz51os.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669926/yfd93oobvt6jjenkedb1.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669927/ju9wd0pprl3tz5kb0ok5.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669927/pohbvmnhgmnl9jtmtbnl.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669928/huc1lmrzttf3rifqglx3.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669929/yd0ch8duwwayh4gorvay.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669929/u67rbw6aa2hwdgzc1dkf.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669929/af07uukv02vx4mi80hua.svg",
            "https://res.cloudinary.com/diyzi4fll/raw/upload/v1738669930/csig5fdbdjkztgov60jz.svg"
        ];
        $ligas = Liga::all();
        foreach ($ligas as $liga) {
            for ($i = 0; $i < 20; $i++) {
                Equipo::create([
                    'nombre' => fake()->company() . " FC",
                    'ciudad' => $arrayCiudadPorPais[$liga->pais][random_int(0, 9)],
                    'pais' => $liga->pais,
                    'liga_id' => $liga->id,
                    'escudo' => $urls[$i % count($urls)],
                ]);
            }
        }
    }
}
