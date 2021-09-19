<script>
export default {
    methods: {
        expandAccordion(e) {
            const accordionButton = e.target;
            accordionButton.classList.toggle('collapsed');
            accordionButton.toggleAttribute('aria-expanded');
            const elId = e.target.getAttribute('data-bs-target').replace('#','')
            document.getElementById(elId).classList.toggle('collapse')
        }
    }
}
</script>


