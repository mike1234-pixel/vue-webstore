<script>
export default {
    methods: {
        expandAccordion(e) {
            e.target.classList.toggle('collapsed')
            const elId = e.target.getAttribute('data-bs-target').replace('#','')
            document.getElementById(elId).classList.toggle('collapse')
        }
    }
}
</script>


