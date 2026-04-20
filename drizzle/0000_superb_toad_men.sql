ALTER TABLE "plants" ADD COLUMN "hero_photo_id" uuid;--> statement-breakpoint
ALTER TABLE "plants" ADD CONSTRAINT "plants_hero_photo_id_plant_photos_id_fk" FOREIGN KEY ("hero_photo_id") REFERENCES "public"."plant_photos"("id") ON DELETE set null ON UPDATE no action;
