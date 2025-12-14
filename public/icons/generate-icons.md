# PWA Icons

To complete PWA setup, add app icons in the following sizes:

- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## Quick Generate Icons

You can use tools like:
1. **PWA Asset Generator**: https://www.pwabuilder.com/imageGenerator
2. **Favicon Generator**: https://realfavicongenerator.net/
3. **ImageMagick** (if installed):

```bash
# Create a simple icon from scratch or use your logo
convert -size 512x512 xc:transparent -fill '#667eea' -draw 'circle 256,256 256,50' icon-512x512.png
convert icon-512x512.png -resize 384x384 icon-384x384.png
convert icon-512x512.png -resize 192x192 icon-192x192.png
convert icon-512x512.png -resize 152x152 icon-152x152.png
convert icon-512x512.png -resize 144x144 icon-144x144.png
convert icon-512x512.png -resize 128x128 icon-128x128.png
convert icon-512x512.png -resize 96x96 icon-96x96.png
convert icon-512x512.png -resize 72x72 icon-72x72.png
```

## Temporary Placeholder

For now, you can create a simple placeholder:

```bash
cd public/icons
for size in 72 96 128 144 152 192 384 512; do
  cat > icon-${size}x${size}.png.placeholder << END
This is a placeholder. Replace with actual ${size}x${size} PNG icon.
END
done
```
