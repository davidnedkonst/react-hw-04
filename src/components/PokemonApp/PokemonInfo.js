import Section from "../Section";

export default function PokemonInfo({ info: { name, sprites, stats, weight } }) {
    const imgSrc = sprites.other["official-artwork"].front_default;
    const imgAlt = `Pokemon ${name} image`;

    return (
        <Section title="Pokemon Info">
            <h3>{name}</h3>

            <img
                src={imgSrc}
                alt={imgAlt}
                width="160px"
            />

            <ul>{
                stats.map(
                    ({ stat: { name }, base_stat }) => {
                        return (
                            <li key={name}>
                                {`${name}: ${base_stat}`}
                            </li>
                        );
                    }
                )
            }</ul>

            <div>
                {`Weight: ${weight}`}
            </div>

        </Section>
    );
};