import { models } from "./loader";
import { scene } from "./scene";

export function addGround() {
  let rocks = ["crater", "craterLarge", "rocksTallOre", "meteorHalf", "rocks", "rocksOre", "rocksSmall", "rocksSmallOre", "rocksTall"];
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      let rock = models[rocks[Math.floor(Math.random() * rocks.length)]].clone();

      if (Math.random() > 0.17) continue;
      rock.rotation.x = Math.PI / 2;

      // 6 is a magic number that when multiplied with the amount the meteors are currently shifted, aligns the rocks to their base
      rock.position.z = rock.position.y * 6 - 80;
      rock.position.x = 80 * i + 70;
      rock.position.y = 80 * j + 70;

      rock.scale.x = 600;
      rock.scale.y = 300;
      rock.scale.z = 600;
      scene.add(rock);
    }
  }
}
