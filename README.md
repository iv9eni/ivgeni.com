# Overview

The Svelte application I host from [ivgeni.com](ivgeni.com)

## How to start

1. I usually just run it in a Codespace and .devcontainer setups all things necessary for dev which is just `npm install`
2. Start development environment with: `npm run dev` and it'll be available at `http://localhost:5173` if you're not already using that port

## Noteworthy things

### Github Pages

Svelte has an adapter specifically for SSR which is compatible with Github pages where I am hosting this page. The plugins called **@sveltejs/adapter-static** and under _/routes/+layout.ts_ append this line:

```typescript
export const prerender = true;
```

Also, by default, Github builds websites using Jekyll but since I'm using SvelteKit that won't work. To turn of Jekyll you just put an empty file under `/static/.nojekyll`.

_...need to write the rest of this later when I actually deploy it to Github Pages lol..._

### Icons

I didn't want to import an entire library of icons that I'll never use so I opted to use my own handful of svg's I quickly took off [Iconify](https://icon-sets.iconify.design/).

- I uploaded the .svg's and then created a map of String -> Icon components which rendered the actual svg. The reason I used a map is because _content.json_ defines which icon (by string) the specific social media link is going to use which would serve as the key for the svg.
- To keep the Icon's style consistent, I had to take the `<path>`'s under the `<svg>` and render them between a standardized `<svg>` component within an icon group (_SocialLinks.svelte_) to keep width, height, and colour consistent across all icons.

### Prettify

- I took someones .prettierrc file that was made for Svelte and Tailwind projects to keep styling consistent across the application.

### Unit Testing

...don't have yet....

## Todo

- Unit Tests
- Rest of the sections
- Move styling from low level components higher (SocialLinks, IconLoader, and DarkModeToggle)
