<!-- ERROR 404 ~ PAGE NOT FOUND -->
<script>
    import { url } from '@roxi/routify'
</script>

<section>
    <code>404</code>
    <a href={ $url('../') }>Go back</a>
</section>

<style lang=scss>
    section {
        display: grid;
        align-items: center;
        min-height: 100vh;
        text-align: center;

        code, a {
            line-height: 20vh;
            width: 80vw;
            backdrop-filter: blur(92px) saturate(0.33);
            font-size: 2rem;
            color: rgb(240,240,240);
            text-shadow: 0 0 4px rgba(150,30,0,1);
        }

        code { 
            color: rgb(190,180,180);
        }
    }
</style>
